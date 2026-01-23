export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getFormatDate(dateObj){
    let day = dateObj.getDate();
    let month = dateObj.getMonth() +1;
    return day+"/"+month
}

// Returns an array with a max size of 'count' storing the highest value key-value-pairs in 'map'
export function getTopElements(map, count) {
    if (map.size > count) {
        let kvps = [...map.keys()];
        while (kvps.length > count)
        {
            let i = 0;
            let l = 0;

            for (i=0; i<kvps.length; i++)
            {
                if (i == 0) continue;
                if (kvps[i][1] > kvps[l][1])
                    l=i;
            }
            kvps.splice(l,1);
        }
        return kvps;
    }
    else return [...map.keys()];
}

export async function loadPartial(parentID, partialPath, wrapper_class = "", index = undefined) {
    let parent = document.getElementById(parentID) ?? document.body;

    const response = await fetch(partialPath);
    const partial = await response.text();

    const wrapper = document.createElement("div");
    wrapper.innerHTML = partial;
    wrapper.classList = wrapper_class;

    let el = wrapper.firstElementChild;
    el.id = crypto.randomUUID();

    try {
        // if an index is given, place the new element there.
        const ref = parent.children[index];
        parent.insertBefore(el, ref);
    }
    catch {
        // if no index is given, or the index is invalid, place the new element at the bottom.
        parent.appendChild(el);
    }

    return {
        id: el.id, 
        element: el
    };
}