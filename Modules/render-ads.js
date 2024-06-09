export class RenderAds
{
    static main(ads, elementIds)
    {
        ads.forEach((adItem, index) =>
        {
            const element = document.getElementById(elementIds[index]);
            if (element)
            {
                element.innerHTML = `<img src="${adItem.path}" alt="Ad ${index + 1}">`;
            }
        });
    }
}
