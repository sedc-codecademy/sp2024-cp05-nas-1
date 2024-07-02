export function getQueryParams()
{
    const params = {};
    const queryString = window.location.search.substring(1);
    const queries = queryString.split("&");

    for (const query of queries)
    {
        const [key, value] = query.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }

    return params;
}