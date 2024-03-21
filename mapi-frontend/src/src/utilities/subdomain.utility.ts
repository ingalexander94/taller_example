export const getSubdomain = (): string => {
  let subdomain = "";
  const domain = window.location.hostname.split(".");
  if (domain.length > 2) {
    subdomain = domain[0];
  }
  return subdomain;
};
