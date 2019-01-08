export const versions = [
    {
        number: '1.6.0',
        date: '09 January 2019',
        title: "New major update ! New filtering system + some redesign.",
        content: {
            point1: "Enhanced filtering system ! There is now a button dedicated to show filters, less mess on the main page ! You can still use \"old\" filters and you can now select only sets having the selected bonus ! Thanks @xanderbitme for the suggestion on reddit.",
            point2: "Filters are stackable ! ",
            point3: "From the previous point, you now have filter button in the top bar, when filters are applyed the filter button will turn green and you'll have a reset filter button available.",
            point4: "Redesigned text input search bar. Will now be bigger and easier to reach on small devices.",
            point5: "Redesigned Stats Summary box, you can now have a better view of your current stats and also have each set stats next to it.",
            point6: "Modified modal close system. Previously any click would close it, now if you click on the \"textbox\" it will keep opened. You have to click outside of it (or press esc) to close it. This will prevent unwanted modal closures.",
            point7: "Moved the not connected alert out of summary box for computer screen extraction. You will no longer have it on your offline saved setups.",
            point8: "Removed some forgotten console.log() (Woopsie !)",
        },
    },
    {
        number: '1.5.2',
        date: '17 December 2018',
        title: "Minor bug fix for selected list and stats calculation.",
        content: {
            point1: "Fixed bug that was not clearing list properly (previously on index from a weird map(), now properly get index from selected set list based on set name).",
        },
    },
    {
        number: '1.5.1',
        date: '16 November 2018',
        title: "Minor design fixes for mobile/tablet devices.",
        content: {
            point1: "Fixed set categories text going out of the box under specific resolutions (ipad mostly).",
        },
    },
    {
        number: '1.5',
        date: '15 November 2018',
        title: "Offline mod, minor changes.",
        content: {
            point1: "You can now use EFAB offline ! This will require to at least access the app online once then data will be stocked and you'll be able to use everything as usual even if you have no connection !",
            point2: "Image links added to modal upon EFAB logo.",
        },
    },
    {
        number: '1.4',
        date: '14 November 2018',
        title: "Mobile Application prompt, mobile summary list button.",
        content: {
            point1: "Your browser should now propose you to \"install\" EFAB on your mobile ! It's a simple link to the app but without all the browsers features around like URL bar !",
            point2: "Mobile button to show summary of selected arts list has changed, it should feel more \"natural\".",
        },
    },
    {
        number: '1.3.1',
        date: '13 November 2018',
        title: "Minor updates, fixed api public urls, design fixes, donation button.",
        content: {
            point1: "Few updates upon back-end (forced HTTPS, public urls).",
            point2: "Updated different modals sizes.",
            point3: "Added paypal.me link, if you like this tool feel free to support and reward me ! :)",
        },
    },
    {
        number: '1.3',
        date: '12 November 2018',
        title: "Sets selection modified, EFAB infos changed, improved performances.",
        content: {
            point1: "Sets selections has been modified, you can now select only 1 set (from same family) at a time. To unselect it, simply click on the \"X\" above.",
            point2: "Changed infos in EFAB logo, feel free to send feedbacks directly on Reddit now ! :)",
            point3: "Improved overall performances and accessibility.",
            point4: "Even if it's not that usefull here since you don't use sensible data, HTTPS in now enabled ! Feel safe !",
        },
    },
    {
        number: '1.2',
        date: '11 November 2018',
        title: "Versioning status + arts number sorting.",
        content: {
            point1: "Added versioning status to track historical versions, since this is new, starting version is now 1.2.",
            point2: "From recommendation, summary box is now in a more neutral color and font is black for better readability.",
            point3: "Added sorting arts number for every sets (I.E previous was 6 2 4, now it's 2 4 6).",
            point4: "Updated every 7* sets data for new T2 !",
        },
    },
];

