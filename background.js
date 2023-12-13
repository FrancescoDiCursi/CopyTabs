chrome.runtime.onMessage.addListener((request, sender,sendResponse)=>{
    if(request.message==="get_tabs"){
        chrome.tabs.query({},(tabs)=>{
            console.log("TABS", tabs)
            let urls=[]
            tabs.forEach(tab=>{urls.push(tab.url)})
            console.log(urls)
            sendResponse({urls:urls})
        }) //empty query === all
    } else if(request.message==="download_txt_file"){
        chrome.downloads.download({url:request.data, filename:"my_tabs.txt"})
        console.log("DOWNLOAD")
    }else if(request.message==="import_txt_file"){
        let urls=request.data
        urls.forEach(url=>{
            chrome.tabs.create({url:url})
        })
    }

    return true
})