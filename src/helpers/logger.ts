import { omit } from "lodash";

export interface StructuredMessage {
  msg: string;
  error?: any;
  [key: string]: any;
}

export type Message = string | StructuredMessage;

const selectMessage = (msg: Message) =>
  typeof msg === "string" ? msg : msg?.msg;

const selectData = (msg: Message) =>
  typeof msg === "string" ? {} : omit(msg, ["msg", "error"]);

const selectError = (msg: Message) => {
  if (typeof msg === "string") {
    return new Error(msg);
  }
  if (msg.error instanceof Error) {
    return msg.error;
  }
  return new Error(msg?.msg);
};

const info = (moduleName: string, msg: Message) => {
  const message = selectMessage(msg);
  const data = selectData(msg);
  console.log({ moduleName, message, data }); // send to logger when decided on a logger
};

const warn = (moduleName: string, msg: Message) => {
  const message = selectMessage(msg);
  const data = selectData(msg);

  if (typeof msg !== "string" && msg.error) {
    data.error = selectError(msg).message;
  }
  console.log({ moduleName, message, data }); // send to logger when decided on a logger
};

const error = (moduleName: string, msg: Message) => {
  const message = selectMessage(msg);
  const err = selectError(msg);
  const data = selectData(msg);
  console.log({ moduleName, message, data, err }); // send to logger when decided on a logger
};

export const createTypedLogger = (moduleName: string) => ({
  info: (msg: Message) => info(moduleName, msg),
  warn: (msg: Message) => warn(moduleName, msg),
  error: (msg: Message) => error(moduleName, msg),
});

export type Logger = ReturnType<typeof createTypedLogger>;


