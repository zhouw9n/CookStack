const isOpen =  ref(false);

export function useFilterMenu() {
    

    function openFilterMenu() {
        isOpen.value = true;
    }

    function closeFilterMenu() {
        isOpen.value = false;
    }

    return { 
        isOpen,
        openFilterMenu,
        closeFilterMenu
    }
}

