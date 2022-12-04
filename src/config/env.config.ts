

export const envConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})

// aqui estoy mapeando mis variables de entorno a un objeto de nuestras varibales de entorno