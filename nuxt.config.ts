export default defineNuxtConfig({
    nitro: {
        routeRules: {
            "/province/**": {
                swr: 60 * 60,
            },
            "/district": {
                swr: 60 * 60,
            },
        }
    },
})