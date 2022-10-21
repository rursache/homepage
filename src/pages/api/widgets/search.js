import createLogger from "utils/logger";
import { getPrivateWidgetOptions } from "utils/config/widget-helpers";

const logger = createLogger("search");

export default async function handler(req, res) {
  const { index } = req.query;

  const data = await getPrivateWidgetOptions("search", index);
  
  return res.status(200).send(data);
}
