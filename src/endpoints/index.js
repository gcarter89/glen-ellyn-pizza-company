import makeDb from "../database/index.js";
import makeItemActions from "../actions/item-actions.js";
import makeUserActions from "../actions/user-actions.js";
import makeOrderActions from "../actions/order-actions.js";
import makeItemsEndpointHandler from "./item-endpoint-handler.js";
import makeUsersEndpointHandler from "./user-endpoint-handler.js";
import makeOrdersEndpointHandler from "./order-endpoint-handler.js";


const database = await makeDb();
const itemActionList = makeItemActions({ database });
const userActionList = makeUserActions({ database });
const orderActionList = makeOrderActions({ database });
const itemsEndpointHandler = makeItemsEndpointHandler({ itemActionList });
const usersEndpointHandler = makeUsersEndpointHandler({ userActionList });
const ordersEndpointHandler = makeOrdersEndpointHandler({ orderActionList });

export default {itemsEndpointHandler, usersEndpointHandler, ordersEndpointHandler};