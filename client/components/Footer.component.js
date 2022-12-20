function FooterComponent() {
    const content = `Designed & developed by <a target="_blank" class="underline text-[#093a5b]" href="https://github.com/yuswf">@yuswf</a> with <span class="text-red-500">❤️</span>`;

    return (
        <footer className="absolute bottom-2 w-full h-10 justify-center items-center flex font-bold"> {/*p-5 flex h-14 justify-center items-center mb-14*/}
            <p dangerouslySetInnerHTML={{__html: content.replace(/href/g, "target='_blank' href")}}></p>
        </footer>
    );
}

export default FooterComponent;
