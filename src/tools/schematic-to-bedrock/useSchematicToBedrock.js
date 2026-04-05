import { useCallback, useEffect, useRef, useState } from "react";

const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function apiUrl(path) {
  return `${apiBase}${path}`;
}

export function useSchematicToBedrock() {
  const [jobs, setJobs] = useState([]);
  const [health, setHealth] = useState(null);
  const timersRef = useRef(new Map());

  const fetchHealth = useCallback(async () => {
    try {
      const r = await fetch(apiUrl("/api/health"));
      const text = await r.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setHealth({
          ok: false,
          offline: true,
          error: `Bad response (HTTP ${r.status})`,
        });
        return;
      }
      if (!r.ok) {
        setHealth({
          ok: false,
          offline: r.status === 502 || r.status === 503 || r.status === 504,
          httpStatus: r.status,
          ...data,
        });
        return;
      }
      setHealth(data);
    } catch {
      setHealth({ ok: false, offline: true });
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  const stopPolling = useCallback((id) => {
    const t = timersRef.current.get(id);
    if (t) clearInterval(t);
    timersRef.current.delete(id);
  }, []);

  const pollJob = useCallback(
    (id) => {
      stopPolling(id);
      const tick = async () => {
        try {
          const r = await fetch(apiUrl(`/api/jobs/${id}`));
          if (!r.ok) return;
          const data = await r.json();
          setJobs((prev) =>
            prev.map((j) =>
              j.id === id
                ? {
                    ...j,
                    status: data.status,
                    queuePosition: data.queuePosition,
                    error: data.error,
                    progress: data.progress,
                    stats: data.stats,
                  }
                : j,
            ),
          );
          if (data.status === "completed" || data.status === "failed") {
            stopPolling(id);
          }
        } catch {
          /* ignore */
        }
      };
      tick();
      const h = setInterval(tick, 1200);
      timersRef.current.set(id, h);
    },
    [stopPolling],
  );

  useEffect(() => {
    return () => {
      for (const t of timersRef.current.values()) clearInterval(t);
      timersRef.current.clear();
    };
  }, []);

  const submitFile = useCallback(
    async (file) => {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch(apiUrl("/api/jobs"), { method: "POST", body: fd });
      const text = await r.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        throw new Error(text || `HTTP ${r.status}`);
      }
      if (!r.ok) {
        throw new Error(body.error || `HTTP ${r.status}`);
      }
      const id = body.jobId;
      setJobs((prev) => [
        {
          id,
          filename: file.name,
          status: "queued",
          queuePosition: 0,
          error: null,
          progress: null,
          stats: null,
        },
        ...prev,
      ]);
      pollJob(id);
      fetchHealth();
    },
    [pollJob, fetchHealth],
  );

  const downloadJob = useCallback(async (id) => {
    const r = await fetch(apiUrl(`/api/jobs/${id}/download`));
    if (!r.ok) {
      const t = await r.text();
      throw new Error(t || `HTTP ${r.status}`);
    }
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.mcworld";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    jobs,
    health,
    submitFile,
    downloadJob,
    refreshHealth: fetchHealth,
  };
}
