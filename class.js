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
    
    
}

var clearGraph = function()
{
    d3.selectAll("svg circle")
        .remove();
};


  var buttons= function(penguins)
  {
     d3.select("#FvHW")
      .on("clicked", function()
          {console.log("clicked")
           
           
           
        .selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx",function(penguin)
        {
            return xScale(meanQuiz(penguin));    
        })
        .attr("cy",function(penguin)
        {
            return yScale(meanHomework(penguin));  
        })
        
        .attr("r",3)
        .attr("fill","blue") 
           
           
           
           
        clearGraph()
        displaySpread(penguins)
        console.log("spread was drawn")
        console.log(penguins)
          });
      
 
  
     d3.select("#HWvQ")
      .on("clicked", function()
          {console.log("clicked");
        
          });
      
  

     d3.select("#TvF")
      .on("clicked", function()
          {console.log("clicked");
        
          });
      
  

     d3.select("#TvQ")
      .on("clicked", function()
          {console.log("clicked");
        
          });
      
  };