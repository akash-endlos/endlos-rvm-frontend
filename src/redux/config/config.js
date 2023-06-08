const config = {
    api: {
        base: 'https://api-rvm.endlos.live/api/v1/',
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
            deleteInventoryType:'inventrytype/delete',
            getInventoryTypeById:'inventrytype/get',
            addInventory:'inventry/add',
            getInventory:'inventry/get?type=all',
            deleteInventory:'inventry/delete',
            getAllMachines:'machine/get?type=all',
            deleteMachine:'machine/delete'
            // getUser:'Users',
            // categories: 'tutorial-categories',
            // tutorials: 'tutorials'
        }
    }
}
export default config;