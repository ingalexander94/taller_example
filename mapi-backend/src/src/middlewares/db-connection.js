const psl = require("psl");
const { request, response } = require("express");
const { getConnectionBySubdomain } = require("../database/manager");
const { parseDomain } = require("../helpers/formatter");

const resolveClientDBConnection = async (
  req = request,
  res = response,
  next
) => {
  const origin = req.get("origin");
  const re = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/gi;
  const result = re.exec(origin);
  const rawDomain = parseDomain(result);
  const clean = psl.parse(rawDomain);
  let { subdomain } = clean;
  subdomain = !origin || origin.includes("wiedii") ? "mapi" : false;
  if (subdomain) {
    const connection = await getConnectionBySubdomain(subdomain);
    if (connection === undefined)
      return res.json({ message: "Client not exist" });
    if (connection === null)
      return res.json({ message: "Client database not config" });
    req.subdomain = subdomain;
    req.clientConnection = await connection();
    next();
  } else {
    req.clientConnection = null;
    next();
  }
};

module.exports = resolveClientDBConnection;
