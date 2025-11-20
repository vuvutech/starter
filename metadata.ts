export const links = [
    { name: "About", route: "/about" },
    { name: "Community", route: "/community" },
    { name: "Pricing", route: "/pricing" },
    { name: "Company", route: "/company" },
];

export const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
};
