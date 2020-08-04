export default {
    title: "Project",
    name: "project",
    type: "document",
    fields: [
        {
            title: "Name",
            name: "name",
            type: "string",
        },
        {
            title: "Title",
            name: "title",
            type: "localeString",
        },
        {
            title: "Source Url",
            name: "sourceUrl",
            type: "url",
        },
        {
            title: "Demo Url",
            name: "demoUrl",
            type: "url",
        },
        {
            title: "Screenshot",
            name: "screenshot",
            type: "image"
        }
    ]
}