const routesPaths = {
    home: '/',
    login: '/login',
    myDocuments: '/docs',
    editor: {
        template: '/x/:docId',
        createPath: (docId: string) => `/x/${docId}`
    },
};

export default routesPaths;
