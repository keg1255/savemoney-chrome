import {watchLocal} from "./utils";
import local from "./local";

export const config = watchLocal("local.app", local["local.app"]);
