function FooterComponent() {
    const content = `Designed & developed by <a target="_blank" class="underline text-[#093a5b]" href="https://github.com/yuswf">@yuswf</a> with <span class="text-red-500">❤️</span>`;

    return (
        <footer className="p-5 flex h-14 justify-center items-center mb-14">
            <p dangerouslySetInnerHTML={{__html: content.replace(/href/g, "target='_blank' href")}}></p>
        </footer>
    );
}

export default FooterComponent;
