export const BLOG_POSTS = [
  {
    id: "paper-vs-spigot",
    title: "Best Minecraft Server Software (2026): Paper vs Spigot vs Bukkit vs Folia",
    description: "Compare Paper, Spigot, Bukkit, and Folia to find the best Minecraft server software. Learn which is best for performance, plugins, and scalability.",
    date: "April 21, 2026",
    author: "Craftingtable Staff",
    readTime: "7 min read",
    category: "Server Software",
    content: `
<div class="space-y-8">
  <p class="text-xl text-muted-foreground leading-relaxed">
    Choosing the <strong>best Minecraft server software</strong> is one of the most important decisions you’ll make as a server owner. It directly affects performance, plugin compatibility, and how well your server scales under load.
  </p>

  <p class="text-xl text-muted-foreground leading-relaxed">
    Most admins end up choosing between <strong>Bukkit</strong>, <strong>Spigot</strong>, <strong>Paper</strong>, and the newer <strong>Folia</strong>.
  </p>

  <p class="text-xl text-muted-foreground leading-relaxed">
    So which one should you actually use in 2026? Let’s break it down.
  </p>

  <h2 class="text-3xl font-bold mt-12">Paper vs Spigot vs Bukkit vs Folia</h2>

  <p class="text-lg text-muted-foreground">
    All of these server software options are based on the same core — but they differ massively in performance optimizations, modern features, and how they handle player load.
  </p>

  <div class="grid lg:grid-cols-2 gap-8 mt-12">
    <!-- Bukkit Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-zinc-500/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-zinc-500/10 flex items-center justify-center text-zinc-500 font-bold text-xl ring-1 ring-zinc-500/20">BK</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">Bukkit</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">legacy plugin API foundation</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-zinc-500 text-[10px] font-black tracking-widest uppercase ring-1 ring-zinc-500/20">Outdated</span>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase mb-4 block opacity-70">Pros</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Simple and lightweight base</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Foundation for most plugin development</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Wide historical compatibility</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">Cons</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Completely outdated for modern servers</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>No meaningful performance optimizations</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Rarely used in production today</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Superseded by Spigot and Paper</span>
               </li>
            </ul>
          </div>
       </div>
    </div>

    <!-- Spigot Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-amber-500/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xl ring-1 ring-amber-500/20">SP</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">Spigot</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">improved Bukkit with optimizations</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-amber-500/20">Stable</span>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase mb-4 block opacity-70">Pros</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Better performance than Bukkit</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Very stable and widely supported</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Huge plugin compatibility</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Industry standard for many years</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">Cons</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Outclassed by Paper in performance</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Fewer modern optimizations</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Slower innovation</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>No reason to choose over Paper in most cases</span>
               </li>
            </ul>
          </div>
       </div>
    </div>

    <!-- Paper Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-blue-500/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl ring-1 ring-blue-500/20">PP</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">Paper</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">high-performance modern server software</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black tracking-widest uppercase ring-1 ring-blue-500/20">Best choice</span>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase mb-4 block opacity-70">Pros</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Significantly better performance than Spigot</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Actively maintained with frequent updates</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Massive plugin compatibility</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Advanced configuration and optimization options</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Industry standard for modern servers</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">Cons</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Some plugins rely on Paper-specific behavior</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Requires basic optimization knowledge for best results</span>
               </li>
            </ul>
          </div>
       </div>
    </div>

    <!-- Folia Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-indigo-500/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-xl ring-1 ring-indigo-500/20">FL</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">Folia</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">multi-threaded region-based server software</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-black tracking-widest uppercase ring-1 ring-indigo-500/20">Advanced</span>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase mb-4 block opacity-70">Pros</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>True multi-threading for massive scalability</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Handles multiple active chunks/regions efficiently</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Ideal for large player counts and spread-out worlds</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Future of high-performance Minecraft servers</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">Cons</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Limited plugin compatibility</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Requires plugins designed specifically for Folia</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Not beginner-friendly</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Still evolving</span>
               </li>
            </ul>
          </div>
       </div>
    </div>
  </div>

  <h2 class="text-3xl font-bold mt-20 mb-8">Which server software should you use?</h2>
  <p class="text-lg text-muted-foreground mb-6">
    If you're running a Minecraft server in 2026, the answer is straightforward:
  </p>

  <div class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors mb-6">
    <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <p class="text-foreground m-0 text-lg leading-relaxed">
      <strong>Paper is the best choice for almost every server.</strong> It offers the best balance of performance, stability, plugin compatibility, and active development. There is virtually no scenario where Spigot or Bukkit is a better option today.
    </p>
  </div>

  <p class="text-lg text-muted-foreground mb-6">
    However, there is one exception:
  </p>

  <div class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors mb-12">
    <div class="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <p class="text-foreground m-0 text-lg leading-relaxed">
      <strong>Use Folia if your server loads many chunks at once or has players spread across the world.</strong> Its region-based multi-threading allows true parallel processing — something traditional servers cannot do. This makes it ideal for large-scale networks, survival servers with exploration, or anything pushing performance limits.
    </p>
  </div>

  <div class="mt-20 p-10 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/20 relative overflow-hidden">
     <div class="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">
       <div class="text-[12rem] font-black tracking-tighter text-blue-500">VERDICT</div>
     </div>
     <div class="relative z-10">
       <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
       </div>
       <h4 class="text-3xl font-black mb-6 tracking-tight text-foreground">Paper wins — and it’s not even close.</h4>
       <p class="text-muted-foreground text-xl leading-relaxed max-w-2xl">
         It’s the modern standard, the most supported platform, and the safest long-term choice. Only consider Folia if you understand its limitations and specifically need its multi-threaded performance model. Otherwise, stick with Paper and optimize it properly.
       </p>
     </div>
  </div>

  <div class="mt-20 p-1 rounded-3xl bg-gradient-to-br from-primary via-primary/50 to-indigo-500">
    <div class="bg-card rounded-[calc(1.5rem-1px)] p-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
      <div class="absolute inset-0 bg-primary/5 mix-blend-overlay opacity-50"></div>
      <div class="relative z-10 flex-1">
        <h3 class="text-3xl font-black mb-3">Speed up your workflow.</h3>
        <p class="text-muted-foreground text-lg max-w-md">Stop manually editing YAML files. Use the tools at <strong>craftingtable.org</strong> to build your server faster.</p>
      </div>
      <a href="/" class="relative z-10 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
        Check out our tools
      </a>
    </div>
  </div>
</div>
    `,
  },
  {
    id: "deluxemenus-vs-commandpanels",
    title: "DeluxeMenus vs CommandPanels: Which Plugin Wins?",
    description: "Choosing the right GUI plugin is critical for your server's user experience. We dive deep into the two industry titans.",
    date: "April 21, 2026",
    author: "Craftingtable Team",
    readTime: "8 min read",
    category: "Plugin Review",
    content: `
<div class="space-y-8">
  <p class="text-xl text-muted-foreground leading-relaxed">
    If you've spent any time running a Minecraft server, you've probably come across the need for a custom GUI menu — whether it's a player hub, a shop, a kit selector, or a warp panel. Two plugins dominate this space: <strong>DeluxeMenus</strong> and <strong>CommandPanels</strong>. Both are powerful, both are popular — but they serve slightly different philosophies. Let's break them down.
  </p>

  <h2 class="text-3xl font-bold mt-12">The Contenders</h2>
  <p class="text-lg text-muted-foreground">At their core, both plugins let you build interactive inventory GUIs using configuration files. Players click on items in a chest-style menu and actions happen — commands run, messages send, menus open. But the way each plugin approaches that task is where things diverge.</p>

  <div class="grid md:grid-cols-2 gap-8 mt-12">
    <!-- DeluxeMenus Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl ring-1 ring-primary/20">DM</div>
          <div>
            <h3 class="text-xl font-bold m-0 leading-none">DeluxeMenus</h3>
            <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">by clip • PlaceholderAPI King</p>
          </div>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-primary uppercase mb-4 block opacity-70">The Strengths</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                 </div>
                 <span>Deep PlaceholderAPI integration — menus can display live server stats.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                 </div>
                 <span>Extremely mature and battle-tested — huge library of online templates.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                 </div>
                 <span>Granular control over every slot and conditional logic.</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">The Weaknesses</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Config syntax is verbose and intimidating for newcomers.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>No built-in GUI editor — everything is hand-written config.</span>
               </li>
            </ul>
          </div>
       </div>
    </div>

    <!-- CommandPanels Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-xl ring-1 ring-indigo-500/20">CP</div>
          <div>
            <h3 class="text-xl font-bold m-0 leading-none">CommandPanels</h3>
            <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">by rockyhawk64 • Modern UX</p>
          </div>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase mb-4 block opacity-70">The Strengths</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                 </div>
                 <span>Much cleaner, more readable YAML config — lower barrier to entry.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                 </div>
                 <span>Actively maintained with very regular feature updates.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                 </div>
                 <span>Built-in features like cooldowns and sounds out of the box.</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">The Weaknesses</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Smaller community compared to DeluxeMenus — fewer pre-made templates.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Advanced conditional logic often requires a premium version.</span>
               </li>
            </ul>
          </div>
       </div>
    </div>
  </div>

  <h2 class="text-3xl font-bold mt-20 mb-8">Feature Comparison</h2>
  <div class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-base border-collapse m-0">
        <thead>
          <tr class="bg-muted/50">
            <th class="p-5 text-left font-bold text-foreground border-b border-border">Category</th>
            <th class="p-5 text-left font-bold text-foreground border-b border-border">DeluxeMenus</th>
            <th class="p-5 text-left font-bold text-foreground border-b border-border">CommandPanels</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/60">
          <tr>
            <td class="p-5 font-medium text-foreground">Ease of setup</td>
            <td class="p-5"><span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-amber-500/20">Moderate</span></td>
            <td class="p-5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-emerald-500/20">Easy</span></td>
          </tr>
          <tr>
            <td class="p-5 font-medium text-foreground">PAPI Support</td>
            <td class="p-5 font-semibold text-primary">Deep (Native)</td>
            <td class="p-5 text-muted-foreground">Supported</td>
          </tr>
          <tr>
            <td class="p-5 font-medium text-foreground">Config Style</td>
            <td class="p-5 text-muted-foreground">Industrial / Verbose</td>
            <td class="p-5 text-emerald-600 font-semibold">Clean / Minimal</td>
          </tr>
          <tr>
            <td class="p-5 font-medium text-foreground">Best for</td>
            <td class="p-5 text-muted-foreground">Power Users</td>
            <td class="p-5 text-muted-foreground">General Admins</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="mt-20 p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden">
     <div class="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">
       <div class="text-[12rem] font-black tracking-tighter">VERDICT</div>
     </div>
     <div class="relative z-10">
       <div class="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
       </div>
       <h4 class="text-3xl font-black mb-6 tracking-tight text-foreground">CommandPanels wins on Developer Experience.</h4>
       <p class="text-muted-foreground text-xl leading-relaxed max-w-2xl">
         It lowers the barrier to entry, lets you move fast, and has enough power for 90% of what most servers actually need. Reserve DeluxeMenus for situations where you truly need its extra depth — and only after you're comfortable with how these plugins work in the first place.
       </p>
     </div>
  </div>

  <div class="mt-20 p-1 rounded-3xl bg-gradient-to-br from-primary via-primary/50 to-indigo-500">
    <div class="bg-card rounded-[calc(1.5rem-1px)] p-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
      <div class="absolute inset-0 bg-primary/5 mix-blend-overlay opacity-50"></div>
      <div class="relative z-10 flex-1">
        <h3 class="text-3xl font-black mb-3">Speed up your workflow.</h3>
        <p class="text-muted-foreground text-lg max-w-md">Stop manually editing YAML files. Use the tools at <strong>craftingtable.org</strong> to build menus visually.</p>
      </div>
      <a href="/" class="relative z-10 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
        Check out our tools
      </a>
    </div>
  </div>
</div>
    `,
  },
  {
    id: "optimize-server-performance",
    title: "How to Optimize Paper for Max TPS (2026 Guide)",
    description: "Learn how to optimize your Paper Minecraft server for maximum TPS. Step-by-step guide covering configs, entities, chunks, plugins, and lag fixes.",
    date: "April 21, 2026",
    author: "Craftingtable Staff",
    readTime: "10 min read",
    category: "Performance Guide",
    content: `
<div class="space-y-8">
  <p class="text-xl text-muted-foreground leading-relaxed">
    If your Minecraft server is suffering from <strong>low TPS, lag spikes, or crashes</strong>, the issue is almost always poor optimization — not hardware.
  </p>
  <p class="text-xl text-muted-foreground leading-relaxed">
    This guide covers exactly how to <strong>optimize your Paper server for maximum TPS</strong>, including configs, entities, chunks, and the best performance plugins.
  </p>

  <h2 class="text-3xl font-bold mt-12">Fix Lag Fast (Do These First)</h2>
  <ul class="space-y-3 list-none p-0 m-0">
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Use <strong>Paper</strong></span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Pre-generate your world</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Lower view-distance (6–10)</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Reduce entity counts</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Install core performance plugins</span>
     </li>
  </ul>

  <div class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors my-6">
    <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <p class="text-foreground m-0 text-lg leading-relaxed">
      These alone can increase TPS by <strong>30–70%</strong> on most servers.
    </p>
  </div>

  <h2 class="text-3xl font-bold mt-12">Optimize Your Paper Configs</h2>
  <ul class="space-y-3 list-none p-0 m-0">
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Lower mob spawn limits</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Adjust hopper speeds</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Reduce item merge radius</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Disable unnecessary mechanics</span>
     </li>
  </ul>

  <h2 class="text-3xl font-bold mt-12">Reduce Entity Lag</h2>
  <div class="grid md:grid-cols-2 gap-8 mt-6">
    <div class="space-y-6">
      <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase block opacity-70">The Problem</span>
      <ul class="space-y-3 list-none p-0 m-0">
         <li class="flex items-start gap-3 text-lg text-muted-foreground">
           <div class="h-6 w-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
             <div class="h-2 w-2 rounded-full bg-red-500"></div>
           </div>
           <span>Too many mobs = constant CPU load</span>
         </li>
         <li class="flex items-start gap-3 text-lg text-muted-foreground">
           <div class="h-6 w-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
             <div class="h-2 w-2 rounded-full bg-red-500"></div>
           </div>
           <span>Dropped items stack up quickly</span>
         </li>
      </ul>
    </div>
    <div class="space-y-6">
      <span class="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase block opacity-70">The Solution</span>
      <ul class="space-y-3 list-none p-0 m-0">
         <li class="flex items-start gap-3 text-lg text-muted-foreground">
           <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
             <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
           </div>
           <span>Limit mob spawning</span>
         </li>
         <li class="flex items-start gap-3 text-lg text-muted-foreground">
           <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
             <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
           </div>
           <span>Clear ground items regularly</span>
         </li>
         <li class="flex items-start gap-3 text-lg text-muted-foreground">
           <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
             <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
           </div>
           <span>Optimize farms</span>
         </li>
      </ul>
    </div>
  </div>

  <h2 class="text-3xl font-bold mt-12">Fix Chunk Lag</h2>
  <ul class="space-y-3 list-none p-0 m-0">
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Pre-generate world</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Set world border</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Lower simulation-distance</span>
     </li>
  </ul>

  <h2 class="text-3xl font-bold mt-12">Best Performance Plugins (Highly Recommended)</h2>
  <p class="text-lg text-muted-foreground mb-8">
    The right plugins don’t just add features — they actively <strong>prevent lag, crashes, and exploits</strong>.
  </p>

  <div class="grid lg:grid-cols-2 gap-8">
    <!-- ExploitFixer -->
    <div class="group flex flex-col justify-between rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl ring-1 ring-primary/20">EF</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">ExploitFixer</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">anti-crash & dupe protection</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-zinc-500/10 text-zinc-500 text-[10px] font-black tracking-widest uppercase ring-1 ring-zinc-500/20">Essential</span>
       </div>
       <div class="p-8 pb-0">
          <p class="text-base text-muted-foreground m-0">Prevents crashes, dupes, and exploit-based lag attacks that can destroy TPS instantly.</p>
       </div>
       <div class="p-8 pt-6 mt-auto">
          <a href="https://builtbybit.com/resources/exploitfixer-anti-crash-dupe-plugin.26463/?ref=318123" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-all">
            View Plugin →
          </a>
       </div>
    </div>

    <!-- Redstone Limiter -->
    <div class="group flex flex-col justify-between rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xl ring-1 ring-amber-500/20">RL</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">Redstone Limiter</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">control redstone lag</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-amber-500/20">High Impact</span>
       </div>
       <div class="p-8 pb-0">
          <p class="text-base text-muted-foreground m-0">Automatically detects and limits laggy redstone clocks and machines — one of the biggest TPS killers.</p>
       </div>
       <div class="p-8 pt-6 mt-auto">
          <a href="https://builtbybit.com/resources/redstonelimiter-smart-redstone-limiter.23133/?ref=318123" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-all">
            View Plugin →
          </a>
       </div>
    </div>

    <!-- LPX -->
    <div class="group flex flex-col justify-between rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl ring-1 ring-blue-500/20">LP</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">LPX</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">anti-packet exploit</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black tracking-widest uppercase ring-1 ring-blue-500/20">Security</span>
       </div>
       <div class="p-8 pb-0">
          <p class="text-base text-muted-foreground m-0">Protects your server from packet-based exploits and malicious traffic that can cause lag or crashes.</p>
       </div>
       <div class="p-8 pt-6 mt-auto">
          <a href="https://builtbybit.com/resources/lpx-antipacketexploit.15709/?ref=318123" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-all">
            View Plugin →
          </a>
       </div>
    </div>

    <!-- Performance Suite -->
    <div class="group flex flex-col justify-between rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-xl ring-1 ring-indigo-500/20">PS</div>
            <div>
              <h3 class="text-xl font-bold m-0 leading-none">Performance Suite</h3>
              <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">diagnostics & monitoring</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-black tracking-widest uppercase ring-1 ring-indigo-500/20">Advanced</span>
       </div>
       <div class="p-8 pb-0">
          <p class="text-base text-muted-foreground m-0">Gives you a full diagnostic dashboard to identify lag sources and monitor TPS in real time.</p>
       </div>
       <div class="p-8 pt-6 mt-auto">
          <a href="https://builtbybit.com/resources/performance-suite-diagnostic-dashboard.84552/?ref=318123" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-all">
            View Plugin →
          </a>
       </div>
    </div>
  </div>

  <div class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors my-8">
    <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <p class="text-foreground m-0 text-lg leading-relaxed">
      These plugins focus on <strong>prevention, control, and diagnostics</strong> — the three pillars of a high-performance server.
    </p>
  </div>

  <h2 class="text-3xl font-bold mt-12">Advanced Optimization</h2>
  <ul class="space-y-3 list-none p-0 m-0">
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Use /timings to find lag sources</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Optimize redstone usage</span>
     </li>
     <li class="flex items-start gap-3 text-lg text-muted-foreground">
       <div class="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
         <div class="h-2 w-2 rounded-full bg-emerald-500"></div>
       </div>
       <span>Upgrade CPU (single-core performance matters most)</span>
     </li>
  </ul>

  <div class="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 shadow-sm my-8">
    <p class="text-amber-600 dark:text-amber-500 m-0 text-lg font-medium">
      Running a large-scale server? Consider <strong>Folia</strong> for multi-threaded performance.
    </p>
  </div>

  <h2 class="text-3xl font-bold mt-20 mb-8">How to Achieve Stable 20 TPS</h2>
  <div class="mt-8 p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden">
     <div class="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">
       <div class="text-[12rem] font-black tracking-tighter text-primary">VERDICT</div>
     </div>
     <div class="relative z-10">
       <div class="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
       </div>
       <h4 class="text-3xl font-black mb-6 tracking-tight text-foreground">High TPS comes from optimization, not hardware.</h4>
       <p class="text-muted-foreground text-xl leading-relaxed max-w-2xl">
         Control entities, optimize configs, manage chunks, and use the right plugins — and your server will scale smoothly without lag.
       </p>
     </div>
  </div>
</div>
    `,
  },
  {
    id: "design-engaging-menus",
    title: "Designing engaging GUI menus that players actually use",
    description: "Your server menus are the front door to your features. Here is how to make them intuitive.",
    date: "April 15, 2026",
    author: "Craftingtable Team",
    readTime: "7 min read",
    category: "GUI Design",
    content: `
      <h2>The Psychology of Menus</h2>
      <p>Players shouldn't have to guess where to click. Use color-coded items and clear descriptions.</p>
      
      <h3>Menu Best Practices:</h3>
      <ul>
        <li><strong>Consistency:</strong> Use the same color for 'Back' and 'Close' buttons across all menus.</li>
        <li><strong>Tooltips:</strong> Keep item lore short and readable. Use MiniMessage for better styling.</li>
        <li><strong>Animated Elements:</strong> Subtle animations (like shifting colors) can guide a player's eye to featured items.</li>
      </ul>
      
      <blockquote>"A well-designed menu is invisible—the player just knows what to do." — Craftingtable Admin Team</blockquote>
    `,
  },
  {
    id: "itemsadder-vs-nexo-vs-oraxen",
    title: "ItemsAdder vs Nexo vs Oraxen: Best Custom Items Plugin (2026)",
    description: "Choosing the right custom items engine is vital for server content. We compare ItemsAdder, Nexo, and Oraxen on performance, security, and ecosystem.",
    date: "April 21, 2026",
    author: "Craftingtable Team",
    readTime: "9 min read",
    category: "Plugin Review",
    content: `
<div class="space-y-8">
  <p class="text-xl text-muted-foreground leading-relaxed">
    Looking for the <strong>best custom items plugin for Minecraft</strong>? Whether you're running a Skyblock, Prison, SMP, or RPG server, custom models and textures are essential for standing out. There is no single "perfect" solution, but most server owners end up choosing between <strong>ItemsAdder</strong>, <strong>Nexo</strong>, or <strong>Oraxen</strong>.
  </p>

  <p class="text-lg text-muted-foreground">
    This guide breaks down performance, ease of use, features, and asset protection — so you can choose the right setup for your server in 2026.
  </p>

  <h2 class="text-3xl font-bold mt-12">The Contenders</h2>
  <div class="grid lg:grid-cols-3 gap-8 mt-12">
    <!-- ItemsAdder Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl ring-1 ring-blue-500/20">IA</div>
          <div>
            <h3 class="text-xl font-bold m-0 leading-none">ItemsAdder</h3>
            <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">by LoneDev • All-in-one</p>
          </div>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase mb-4 block opacity-70">The Strengths</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                 </div>
                 <span>Complete system for custom items, blocks, and furniture.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                 </div>
                 <span>Massive community ecosystem with pre-made resources.</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">The Weaknesses</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Can be performance-heavy on large networks.</span>
               </li>
            </ul>
          </div>
       </div>
    </div>

    <!-- Nexo Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xl ring-1 ring-emerald-500/20">NX</div>
          <div>
            <h3 class="text-xl font-bold m-0 leading-none">Nexo</h3>
            <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">by TeamNexo • Modern Perf</p>
          </div>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase mb-4 block opacity-70">The Strengths</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Native resource pack encryption and asset protection.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                 </div>
                 <span>Highly optimized for modern Minecraft versions.</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">The Weaknesses</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>Smaller ecosystem than ItemsAdder (for now).</span>
               </li>
            </ul>
          </div>
       </div>
    </div>

    <!-- Oraxen Card -->
    <div class="group rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/30 ring-1 ring-border/5">
       <div class="p-6 border-b border-border/60 bg-muted/20 flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold text-xl ring-1 ring-purple-500/20">OX</div>
          <div>
            <h3 class="text-xl font-bold m-0 leading-none">Oraxen</h3>
            <p class="text-xs text-muted-foreground mt-2 font-medium tracking-tight uppercase">by Th0rgal • Dev Friendly</p>
          </div>
       </div>
       <div class="p-8 space-y-8">
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-purple-500 uppercase mb-4 block opacity-70">The Strengths</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                 </div>
                 <span>Clean, modular architecture preferred by developers.</span>
               </li>
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                 </div>
                 <span>Extremely easy to hook into for custom systems.</span>
               </li>
            </ul>
          </div>
          <div>
            <span class="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase mb-4 block opacity-70">The Weaknesses</span>
            <ul class="space-y-3 list-none p-0 m-0">
               <li class="flex items-start gap-3 text-sm text-muted-foreground">
                 <div class="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                   <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                 </div>
                 <span>No built-in encryption system native to the plugin.</span>
               </li>
            </ul>
          </div>
       </div>
    </div>
  </div>

  <h2 class="text-3xl font-bold mt-20 mb-8">Under the Hood: How They Work</h2>
  <div class="prose prose-slate dark:prose-invert max-w-none mb-12">
    <p class="text-lg text-muted-foreground leading-relaxed">
      All three plugins achieve the same goal—adding custom items without mods—by leveraging Minecraft's built-in <strong>Resource Packs</strong> and <strong>CustomModelData</strong> (or the new 1.20.5+ item components). However, their approach to building and distributing that resource pack varies wildly:
    </p>
    <ul class="space-y-4 mt-6 list-none p-0">
      <li class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
         <div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <h4 class="text-xl font-bold text-foreground mt-0 mb-2 flex items-center gap-3">
           <div class="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm">1</div>
           ItemsAdder's Monolith
         </h4>
         <p class="text-muted-foreground m-0 text-base leading-relaxed">
           ItemsAdder essentially takes over your resource pack generation. It includes its own hosting mechanism (the embedded web server) and zips up the contents. Because it handles blocks, HUDs, and fonts natively, its generated pack can become extremely large. It's powerful, but if you want to use a third-party optimizing tool like PackSquash, integrating it with ItemsAdder's strict folder structure can be a headache.
         </p>
      </li>
      <li class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
         <div class="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <h4 class="text-xl font-bold text-foreground mt-0 mb-2 flex items-center gap-3">
           <div class="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-sm">2</div>
           Nexo's Next-Gen Pipeline
         </h4>
         <p class="text-muted-foreground m-0 text-base leading-relaxed">
           Nexo is built with modern workflows in mind. It cleanly separates the configuration from the generated pack. This makes it incredibly easy to hook up automated GitHub Actions, compress your pack, and upload it to a fast CDN. Crucially, Nexo scrambles the names and paths of your assets upon generation. If a player rips the pack to steal your expensive commissioned textures, they'll find it nearly impossible to make sense of the files.
         </p>
      </li>
      <li class="bg-card p-6 rounded-2xl border border-border/60 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
         <div class="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <h4 class="text-xl font-bold text-foreground mt-0 mb-2 flex items-center gap-3">
           <div class="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 text-sm">3</div>
           Oraxen's Developer Flexibility
         </h4>
         <p class="text-muted-foreground m-0 text-base leading-relaxed">
           Oraxen acts more like a framework. It parses your YAML files, registers the items via the Bukkit API, and generates the pack. Developers love Oraxen because its API is extremely predictable. You can easily listen for Oraxen's item-load events and inject your own custom mechanics, making it the go-to choice for coders who want full control over the runtime environment.
         </p>
      </li>
    </ul>
  </div>

  <h2 class="text-3xl font-bold mt-20 mb-8">Side-by-Side Comparison</h2>
  <div class="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-base border-collapse m-0">
        <thead>
          <tr class="bg-muted/50">
            <th class="p-5 text-left font-bold text-foreground border-b border-border">Category</th>
            <th class="p-5 text-left font-bold text-foreground border-b border-border">ItemsAdder</th>
            <th class="p-5 text-left font-bold text-foreground border-b border-border">Nexo</th>
            <th class="p-5 text-left font-bold text-foreground border-b border-border">Oraxen</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/60">
          <tr>
            <td class="p-5 font-medium text-foreground">Performance</td>
            <td class="p-5"><span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-amber-500/20">Heavy</span></td>
            <td class="p-5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-emerald-500/20">Excellent</span></td>
            <td class="p-5"><span class="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 text-[10px] font-black tracking-widest uppercase ring-1 ring-indigo-500/20">Good</span></td>
          </tr>
          <tr>
            <td class="p-5 font-medium text-foreground">Asset Security</td>
            <td class="p-5 text-muted-foreground">No</td>
            <td class="p-5 font-semibold text-emerald-600 italic">Native Encryption</td>
            <td class="p-5 text-muted-foreground">No</td>
          </tr>
          <tr>
            <td class="p-5 font-medium text-foreground">Ecosystem</td>
            <td class="p-5 font-semibold text-blue-500">Massive</td>
            <td class="p-5 text-muted-foreground">Rapidly Growing</td>
            <td class="p-5 text-muted-foreground">Stable</td>
          </tr>
          <tr>
            <td class="p-5 font-medium text-foreground">Best for</td>
            <td class="p-5 text-muted-foreground">RPG / Furniture</td>
            <td class="p-5 text-muted-foreground">Scale & Security</td>
            <td class="p-5 text-muted-foreground">Developers</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <h2 class="text-3xl font-bold mt-20 mb-8">Choosing Based on Your Server Type</h2>
  <div class="space-y-6 mb-12">
    <div class="p-6 rounded-2xl bg-card border border-border/60 shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </div>
      <div>
        <h4 class="text-xl font-bold text-foreground m-0 mb-2">RPG & Survival Multiplayer (SMP)</h4>
        <p class="text-base text-muted-foreground m-0 leading-relaxed">
          If you are building an RPG server with custom ores, magical weapons, custom armor sets, and furniture, <strong>ItemsAdder</strong> is historically the king. The sheer volume of pre-made packs and configurations available on MCModels and SpigotMC means you can prototype a massive content update in hours rather than weeks.
        </p>
      </div>
    </div>
    
    <div class="p-6 rounded-2xl bg-card border border-border/60 shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m9 14 3-3 3 3"/></svg>
      </div>
      <div>
        <h4 class="text-xl font-bold text-foreground m-0 mb-2">Prison, Skyblock & Competitive Let's Plays</h4>
        <p class="text-base text-muted-foreground m-0 leading-relaxed">
          Competitive gamemodes require high TPS. Having hundreds of players placing down custom models can lag a server. <strong>Nexo</strong> uses more modern, optimized item frame mechanics to render custom blocks, making it far superior for high-density, high-player-count scenarios. Additionally, competitive servers are often targeted by asset stealers; Nexo's encryption puts a stop to that.
        </p>
      </div>
    </div>

    <div class="p-6 rounded-2xl bg-card border border-border/60 shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <div class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </div>
      <div>
        <h4 class="text-xl font-bold text-foreground m-0 mb-2">Custom Minigames & Frameworks</h4>
        <p class="text-base text-muted-foreground m-0 leading-relaxed">
          If your server relies heavily on custom Skripts, Denizen scripts, or Java plugins, <strong>Oraxen</strong> provides the cleanest interface. You won't have to fight its built-in mechanics; you simply hook into its item registry and command system. It does exactly what it says on the tin and leaves the complex logic to you.
        </p>
      </div>
    </div>
  </div>

  <div class="mt-20 p-10 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden">
     <div class="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">
       <div class="text-[12rem] font-black tracking-tighter text-emerald-500">WINNER</div>
     </div>
     <div class="relative z-10">
       <div class="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
       </div>
       <h4 class="text-3xl font-black mb-6 tracking-tight text-foreground">Nexo is the best choice for 2026.</h4>
       <p class="text-muted-foreground text-xl leading-relaxed max-w-2xl">
         If you're investing in custom textures, protecting them is critical — and Nexo is the only plugin that solves that natively while maintaining elite performance. It scales better for networks and provides a cleaner development experience than the aging giants.
       </p>
     </div>
  </div>

  <div class="mt-20 p-1 rounded-3xl bg-gradient-to-br from-primary via-primary/50 to-indigo-500">
    <div class="bg-card rounded-[calc(1.5rem-1px)] p-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
      <div class="absolute inset-0 bg-primary/5 mix-blend-overlay opacity-50"></div>
      <div class="relative z-10 flex-1">
        <h3 class="text-3xl font-black mb-3">Speed up your workflow.</h3>
        <p class="text-muted-foreground text-lg max-w-md">Stop manually editing YAML files. Use the tools at <strong>craftingtable.org</strong> to build your server faster.</p>
      </div>
      <a href="/" class="relative z-10 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
        Check out our tools
      </a>
    </div>
  </div>
</div>
    `,
  },
];

