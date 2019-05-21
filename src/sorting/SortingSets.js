// export const defaultSort = (data) => {
//     return data
// }
function indexSwaps(sort) {
    return sort === 'ASC' ? [1, -1, 0] : [-1, 1, 0];
}

function getGS(set, findBonus) {
    return findBonus(set, /Game Speed/) ? findBonus(set, /Game Speed/) : 0;
}

function getMedals(set, findBonus) {
    return findBonus(set, /Increase Additional Medals Obtained/) ? findBonus(set, /Increase Additional Medals Obtained/) : 0;
}

export const artsPerSetSort = (data, sort) => {
    // For ASC and DESC sorting
    const swaps = indexSwaps(sort);

    return data.sort((a, b) => {
        return a[0].set_total_arts_number > b[0].set_total_arts_number ?
            swaps[0] : b[0].set_total_arts_number > a[0].set_total_arts_number ? swaps[1] : swaps[2]
    })
};


export const alphabeticalSort = (data, sort) => {
    // For ASC and DESC sorting
    const swaps = indexSwaps(sort);

    return data.sort((a, b) => {
        return a[0].set_tech_name > b[0].set_tech_name ?
            swaps[0] : b[0].set_tech_name > a[0].set_tech_name ? swaps[1] : swaps[2]
    })
};

export const GSAmountSort = (data, sort, findBonus) => {
    // For ASC and DESC sorting
    const swaps = indexSwaps(sort);

    return data.sort((a, b) => {
        // Ensure to get the last set to have all set bonuses
        const GSa = getGS(a[a.length - 1], findBonus);
        const GSb = getGS(b[b.length - 1], findBonus);

        return GSa > GSb ? swaps[0] : GSb > GSa ? swaps[1] : swaps[2]
    })
};

export const MedalsAmountSort = (data, sort, findBonus) => {
    // For ASC and DESC sorting
    const swaps = indexSwaps(sort);

    return data.sort((a, b) => {
        // Ensure to get the last set to have all set bonuses
        const medalsA = getMedals(a[a.length - 1], findBonus);
        const medalsB = getMedals(b[b.length - 1], findBonus);

        return medalsA > medalsB ? swaps[0] : medalsB > medalsA ? swaps[1] : swaps[2]

    })
};
