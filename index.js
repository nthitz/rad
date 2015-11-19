var experienceResponses = [
  'I have no experience',
  'I have a little experience',
  'I can do this',
  'I am pretty good',
  'I am RAD at this'
]
var experienceColors = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
var experiencePrefix = 'Please rate your abilities / interest in the following '
var experienceQuestions = [
  'Graphic Design',
  'T-shirt Design',
  'Photography / Videography',
  'Website Building/Maintenance',
  'Email Writing',
  'Social Media',
  'General Administration, day to day stuff, coordinating league play, good RAD role model',
  'Coordination (events, drafts, calendaring, planning)',
  'People Person: Mentoring/Welcoming New Players',
  'Coordinating & Overseeing Refs',
  'Bookkeeping & Taxes: Accounting, Budgeting, Financial Planning,',
  'Turbotax, Taxes',
  'Excel',
  'Business Management, Expansion, Development',
  'Waivers / Insurance',
  'In Person Flyering',
  'Marketing, Advertising',
  'Sponsorship / Sales / Partnerships',
  'working with Partners including OUSD, Jake from wehododgeball',
  'Financial Suppert',
  'Muscle'
]

var thursdayResponses = [
  'Never', '1-2 weeks a season', '3-6 weeks a seson', '7+ weeks a season'
]
var thursdayColors = ['#ffffcc','#c2e699','#78c679','#238443']
var thursdayPrefix = 'What is your Thursday availability like? '
var thursdayQuestions = [
  'Run the door 6-9 Thursdays',
  'Transport Equipment Before & After Thursdays',
  'Responsible Bar Presence 9-? Thursdays',
  'Equipment Storage',
]


var responses = null;
var viz = d3.select('#viz')
d3.tsv('rad_responses.tsv', function(error, _responses) {
  responses = _responses

  plot()
})

function plot() {
  plotThursday()
  plotExperience()
}

function plotThursday() {
  var thursday = viz.append('div').attr('class','thursday')
  thursday.append('div').attr('class','title').text('Thursdays:')
  _.each(thursdayQuestions, function(question) {
    var row = thursday.append('div').attr('class','row cf')
    row.append('div').attr('class','label').text(question)
    var responsesDiv = row.append('div').attr('class','responses cf')
    var key = thursdayPrefix + '[' + question + ']'
    var rowCounts = []
    _.each(responses, function(response) {
      var questionResponse = response[key]
      var responseIndex = thursdayResponses.indexOf(questionResponse)
      var color = thursdayColors[responseIndex]
      if (! color) {
        color = '#fff'
      } else {
        rowCounts.push(responseIndex)
      }
      responsesDiv.append('div').style('background-color', color)
        .attr('title', questionResponse)
    })
    var avg = _.sum(rowCounts) / rowCounts.length

    responsesDiv.append('div')
    responsesDiv.append('div')
    var color = thursdayColors[Math.round(avg)]
    responsesDiv.append('div').style('background-color',color)
      .text(Math.round(avg * 10) / 10)

  })
}


function plotExperience() {
  var experience = viz.append('div').attr('class','experience')
  experience.append('div').attr('class','title').text('Experience')
  _.each(experienceQuestions, function(question) {
    var row = experience.append('div').attr('class','row cf')
    row.append('div').attr('class','label').text(question)
    var responsesDiv = row.append('div').attr('class','responses cf')
    var key = experiencePrefix + '[' + question + ']'
    var rowCounts = []
    _.each(responses, function(response) {
      var questionResponse = response[key]
      var responseIndex = experienceResponses.indexOf(questionResponse)
      var color = experienceColors[responseIndex]
      if (! color) {
        color = '#fff'
      } else {
        rowCounts.push(responseIndex)
      }
      responsesDiv.append('div').style('background-color', color)
        .attr('title', questionResponse)
    })
    var avg = _.sum(rowCounts) / rowCounts.length

    responsesDiv.append('div')
    responsesDiv.append('div')
    var color = thursdayColors[Math.round(avg)]
    responsesDiv.append('div').style('background-color',color)
      .text(Math.round(avg * 10) / 10)

  })
}
