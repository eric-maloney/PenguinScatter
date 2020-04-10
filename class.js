var studentPromise= d3.json("classData.json");
studentPromise.then (function(penguins){
    console.log(penguins);
    displaySpread(penguins);
    
},function(err)
{
   console.log("failed",err);
})

var setTitle = function(msg)
{
    d3.select("#spread h2")
    .text(msg);
}



var getHomework = function(penguin)
{
    return penguin.homework.map(getHWgrade);
}
var getHWgrade = function(homework)
{
    return homework.grade
}
var meanHomework = function(penguin)
{
    return d3.mean (getHomework(penguin));
}

var getFinal = function(penguin)
{
    return penguin.final[0].grade
};



var displaySpread = function(penguins)
{
    var width = 550;
    var height= 300;
    

    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
    
    var xScale = d3.scaleLinear()
                .domain([
                    d3.min(penguins,getFinal),
                    d3.max(penguins,getFinal)
                ])
                .range([0,525])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,meanHomework),
                          d3.max(penguins,meanHomework)
                        ])
                .range([250,0]);
    
    
                        
    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin)
        {
            return xScale(getFinal(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(meanHomework(penguin));  
        })
        
        .attr("r",3)
        .attr("fill","blue")
    
}
  