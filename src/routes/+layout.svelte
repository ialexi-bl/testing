<script lang="ts">
    import '../app.css'
</script>

<div class="flex flex-col h-screen">
    <nav
        class="bg-primary sticky top-0 left-0 w-full h-12 flex justify-between items-center border-b border-white/20"
    >
        <div class="px-3 font-bold">A/B тестирование</div>
        <div class="px-3 font-bold">Контакты</div>
    </nav>
    <div class="w-full flex-grow">
        <slot />
    </div>
</div>
