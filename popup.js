document.addEventListener("DOMContentLoaded",()=>{

    let import_btn= document.getElementById("import_btn")
    let export_btn= document.getElementById("export_btn")

    export_btn.addEventListener("click",()=>export_tabs())
    import_btn.addEventListener("click",async()=>await import_tabs())

})


async function import_tabs(){
    
    [fileHandle]= await window.showOpenFilePicker()
    const file_= await fileHandle.getFile()
    const file_content = await file_.text()
    let imported_names=[]
    let confirm_=confirm("Do you really want to import new tabs?")
    if(confirm_ && file_.name.endsWith(".txt")){
        let urls=[]
        file_content.split("\n").forEach((l,i)=>{
            let line=l
            urls.push(l)
        })

        chrome.runtime.sendMessage({message:"import_txt_file", data:urls})
    }
}

function export_tabs(){
    chrome.runtime.sendMessage({message:"get_tabs"},(response)=>{
        urls= response.urls
        console.log("URLS", urls) 
        
        download(urls)
    })
}

function download(urls){
    let txt_file=urls.join("\n")
    //download text from blob
    let blob= new Blob([txt_file],{type:"text/plain"})
    let url = URL.createObjectURL(blob)
    //download from background page
    chrome.runtime.sendMessage({message:"download_txt_file","data":url})
}