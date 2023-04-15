import CategoryListPage from ".";
import CategoryChildListbase from "./CategoryChildListPage";
import CategoryChildSavePage from "./CategoryChildSavePage";
import CategorySavePage from "./CategorySavePage";
export default {
    categoryListPage: {
        path: '/category',
        title: 'Category',
        auth:true,
        component: CategoryListPage,
    },
    categorySavePage: {
        path: '/category/:id',
        title: 'Category',
        auth: true,
        component: CategorySavePage,
    },
    categoryListChildPage: {
        path: '/category/child/:id',
        title: 'Category',
        auth:true,
        component: CategoryChildListbase,
    },
    categoryChildSavePage: {
        path: '/category/child/:parentid/:id',
        title: 'Category',
        auth: true,
        component: CategoryChildSavePage,
    },
};
