// 导入各个API模块
import * as GameApi from "./gameApi";
import * as ImApi from "./imApi";
import * as LoginApi from "./login";
import { errorHandle } from "./errorHandle";

// 导出错误处理
export { errorHandle };

// 导出所有API，按模块命名区分同名函数
export { GameApi, ImApi, LoginApi };
