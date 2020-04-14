var studentPromise= d3.json("classData.json");
studentPromise.then (function(penguins)
    {
    console.log(penguins); 
    displaySpread(penguins);
    displayHWvQuiz(penguins);
    displayTestvFinal(penguins);
    displayTestvQuiz(penguins);
    clearGraph();
    initialize(penguins);
    
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



var getQuizzes = function(penguin)
{
    return penguin.quizes.map(getQuizgrade);
}
var getQuizgrade = function(quiz)
{
    return quiz.grade
}
var meanQuiz = function(penguin)
{
    return d3.mean (getQuizzes(penguin));
}




var getTests = function(penguin)
{
    return penguin.test.map(getTestgrade);
}
var getTestgrade = function(test)
{
    return test.grade
}
var meanTest = function(penguin)
{
    return d3.mean (getTests(penguin));
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
                    d3.min(penguins,getFinal)-10,
                    d3.max(penguins,getFinal)+10
                ])
                .range([0,550])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,meanHomework)-10,
                          d3.max(penguins,meanHomework)+10
                        ])
                .range([300,0]); 

    
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
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)
}


var displayHWvQuiz = function(penguins)
{
    var width = 550;
    var height= 300;
    

    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
    console.log("Pengins", penguins);
    var xScale = d3.scaleLinear()
                .domain([
                    d3.min(penguins,meanHomework)-10,
                    d3.max(penguins,meanHomework)+10
                ])
                .range([0,550])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,meanQuiz)-10,
                          d3.max(penguins,meanQuiz)+10
                        ])
                .range([300,0]);
    
    
    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin)
        {
            return xScale(meanHomework(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(meanQuiz(penguin));  
        })
        
        .attr("r",3)
        .attr("fill","red") 
}
    

    var displayTestvFinal = function(penguins)
{
    var width = 550;
    var height= 300;
    

    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
    
    var xScale = d3.scaleLinear()
                .domain([
                    d3.min(penguins,meanTest)-10,
                    d3.max(penguins,meanTest)+10
                ])
                .range([0,550])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,getFinal)-10,
                          d3.max(penguins,getFinal)+10
                        ])
                .range([300,0]);
    
      svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin)
        {
            return xScale(meanTest(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(getFinal(penguin));  
        })
        
        .attr("r",3)
        .attr("fill","green") 
    
}
    

    var displayTestvQuiz = function(penguins)
{
    var width = 550;
    var height= 300;
    

    var svg = d3.select("#spread svg")
            .attr("width",width)
            .attr("height",height)
            .attr("id","graph")
    
    
    var xScale = d3.scaleLinear()
                .domain([
                    d3.min(penguins,meanTest)-10,
                    d3.max(penguins,meanTest)+10
                ])
                .range([0,550])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(penguins,meanQuiz)-10,
                          d3.max(penguins,meanQuiz)+10
                        ])
                .range([300,0]);
 
    svg.selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin)
        {
            return xScale(meanTest(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(meanQuiz(penguin));  
        })
        
        .attr("r",3)
        .attr("fill","blueviolet") 
         
         }


var clearGraph = function()
{
    var svg = d3.select("svg")
    .selectAll("circle") 
    .remove()
     console.log(svg)

    }

var initialize= function(penguins)
{
    
    d3.select("#HWvQ")
    .on("click", function()
        {
        clearGraph()
        displayHWvQuiz(penguins);
        document.getElementById("head1").innerHTML="Mean Homework Grades vs Mean Quiz Grades"
        })
    console.log("hello")
    
    
   d3.select("#FvHW")
    .on("click", function()
        {
        clearGraph()
        displaySpread(penguins);
       document.getElementById("head1").innerHTML="Final Grade Vs Mean Homework Grade"
        })
    console.log("hello")
     
    
    d3.select("#TvF")
    .on("click", function()
        {
        clearGraph()
        displayTestvFinal(penguins);
        document.getElementById("head1").innerHTML="Mean Test Grades vs Final Grade"
        })
    console.log("hello")
    
    
    d3.select("#TvQ")
    .on("click", function()
        {
        clearGraph()
        displayTestvQuiz(penguins);
        document.getElementById("head1").innerHTML="Mean Test Grades vs Mean Quiz Grades"
        })
    console.log("hello")
    
    
};

var tooltip = d3.select("#spread svg")
.append("img")
.style("opacity", 0)
.attr("class","tooltip")

var mouseover = function(penguin)
{
    tooltip
    .style("opacity",0)
    .append("img")
    .attr("src",function(penguin)
      {
    return "imgs/" + penguin.picture;
});
}

var mouseleave= function(penguin)
{
 tooltip
 .style("opacity",0)
    
}