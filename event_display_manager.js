class Event
{
    Name;
    DueDate;
    Text;

    GetElement()
    {
        return EventTemplate.replace("%title%", this.Name).replace("%duedate%", this.DueDate).replace("%content%", this.Text);
    }

    constructor(name, duedate, text)
    {
        this.Name = name;
        this.DueDate = duedate;
        this.Text = text;
    }
}

const events = [
    new Event("Writers' Digest", "Feb 4", "<a>https://www.writersdigest.com/writers-digest-competitions/annual-writing-competition</a><br><br>If anyone is curious about submitting to competitions, here's a link to another. \"Early-Bird\" deadline is May 6th, so there's plenty of time!")
]

function LoadEvents()
{
    events.forEach(event => {
        document.getElementById("upcoming_events").innerHTML += event.GetElement();
    })
}

function SetUpcomingPrompt(promptText)
{
    document.getElementById("current_prompt").children[1].innerHTML = promptText;
}

const EventTemplate = `<div class="event_incoming">
<h1>%title%</h1>
<em>(%duedate%)</em>

<p>%content%</p>
</div>`
