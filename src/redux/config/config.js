const config = {
    api: {
        base: 'http://localhost:5000/api/v1/',
        url: {
            login: 'user/login',
            refresh: 'auth/refreshtoken',
            inventory:'inventry/get?type=all',
            getallCustomers:'customer/getAll',
            addCustomer:'customer/add',
            updateCustomer:'customer/update',
            getCustomerById:'customer/get',
            getBranchesById:'branch/getbycustomer',
            addBranch:'branch/add',
            updateBranch:'branch/update',
            deleteBranch:'branch/delete',
            deleteCustomer:'customer/delete',
            inventoryType:'inventrytype/getAll?type=allInventries',
            addInventoryType:'inventrytype/add',
            updateInventoryType:'inventrytype/update',
            deleteInventoryType:'inventrytype/delete'
            // getUser:'Users',
            // categories: 'tutorial-categories',
            // tutorials: 'tutorials'
        }
    }
}
export default config;