import { httpConfig } from "./serve";
import QS from "qs";
export let requestData = (url, data) => httpConfig(`${url}${QS.stringify(data)}`);

