export const versions = [
    {
        number: '1.7.1a',
        date: '26 January 2019',
        title: "Auto-builder results system modified, Set Summary modal, Summary Box update and manual/auto swap modified",
        content: {
            point1: "Results from auto-builder has been slightly modified, the base algorithm is still the same but you will now have all results (previously only \"best\" ones if possible or closest ones) sorted by the art number. This will let you have more choices, even not the most relevant ones, from the results.",
            point2: "Summary Box slight update, you can now see how much parts a set is using after its technical name.",
            point3: "You can now have a set stats summary, simply click on its technical name and you'll have a table with its stats. The legend used is from my own appreciation, it may differ for you but it's just there to help you for readability.",
            point4: "A very big thanks for your feedbacks, as noticed, the algorithm is kicking off sub-parted sets for its final results (too long to explain here), that's why you can sometimes find better compositions than the algorithm when you use some !",
            point5: "To try to help you build, swaping from auto to manual builder will now keep the solution you're using. That means you can use a \"close\" suggested result and complete it the way you want. When you'll back to auto from manual you will get the inputs filled as you did plus you will know which build you selected before (if you did). Sets you excluded will be kept and tiers filters too.",
            point6: "Fixed minor bugs, such as using special characters in search field was making EFAB crash before. Now, they are ignored.",
            point7: "Again, a big thanks for your feedbacks, I try to do as much as i can ! :)",
        },
    },
    {
        number: '1.7.0a',
        date: '20 January 2019',
        title: "Another very huge update ! Automatic builder is here !",
        content: {
            point1: "The Automatic builder to find the bests setups depending on what you need is up ! To use it, simply use the inputs at the top of sets boxes. Fill how much artifacts you want to use, the maximum gs you want and build ! That's as simple as this !",
            point2: "The algorithm can find optimised builds and if it's not possible you can also get the closest results it found (or none if you asked something not reachable).",
            point3: "You can filter which sets' tier you want in the filter list. I.E: you can autobuild with T2 6* and T1 7*",
            point4: "Every set is counted with its parts. I.E: for BE (R2) set, 2/5, 4/5 AND 5/5 are taken in account in the build. If you disable it, you will also disable every parted bonus.",
            point5: "You can still use the manual builder, just click on the new button in the top bar.",
            point6: "You can disable a set from builder by clicking on the \"X\" at the top of its box.",
            point7: "This update is still in alpha since I probably can't think about everything that could happens when you try to build. It required many code addition, update and redesigning. This means you can find some bugs. Feel free to report (contacts in EFAB logo)",
            point8: "If you find a better combination than the algorithm, feel free to report it to me with screens, I will try to check it out.",
            point9: "The algorithm is based on the Multi-Dimensional Knapsack Problem (MDKP) modified to work with EF constraints."
        },
    },
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

