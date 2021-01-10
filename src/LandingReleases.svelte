<script>
    import FeaturedContent from "./FeaturedContent.svelte";
</script>
<div class="max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center mt-32">
    <div class="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
        <div class="font-montserrat text-4xl font-semibold text-orange-700">Start Listening</div>
    </div>
</div>
<div class="max-w-screen-lg xl:max-w-screen-xl mx-auto mt-2">
    <div class="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
            <FeaturedContent />
            <FeaturedContent />
            <FeaturedContent />
            <FeaturedContent />
            <FeaturedContent />
            <FeaturedContent />
            <div class="hidden lg:inline">
                <FeaturedContent />
            </div>
            <div class="hidden lg:inline">
                <FeaturedContent />
            </div>
            <div class="hidden xl:inline">
                <FeaturedContent />
            </div>
            <div class="hidden xl:inline">
                <FeaturedContent />
            </div>
            
        </div>    
    </div>
</div>
<div class="max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center">
    <div class="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8 mt-12">
        <a class="shadow-lg font-montserrat w-full sm:w-auto flex-none bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold leading-6 py-3 px-6 border border-transparent rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-orange-900 focus:outline-none inline-flex items-baseline" href="#/home">Discover More<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px" class="h-6 w-6 fill-current place-self-end ml-1"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg></a>
    </div>
</div>