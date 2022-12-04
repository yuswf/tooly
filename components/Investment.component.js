function InvestmentComponent() {
    return (
        <div className="ml-auto mr-auto" dangerouslySetInnerHTML={{__html: "<iframe src=\"https://api.genelpara.com/iframe/?symbol=doviz&doviz=USD,EUR&stil=stil-5&renk=siyah\" title=\"Döviz Kurları\" frameborder=\"0\" width=\"350\" height=\"200\" style=\"width:350px; height:200px;\"></iframe>"}}/>
    )
}

export default InvestmentComponent;
