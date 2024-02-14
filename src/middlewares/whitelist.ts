
const whitelist =  {
    clientOptionsLimited : {
        origin: ['https://websitelimited.com', 'https://adriantori-w15-b.vercel.app'],
        methods:['GET','POST']
    },
    clientOptionsGlobal : {
        origin: ['https://shell-infotech.vercel.app','http://localhost:8080'],
        methods:['GET','POST','PUT','DELETE', 'PATCH'],
        credentials: true,  // Allow credentials (cookies) to be sent
    }
}

export default whitelist