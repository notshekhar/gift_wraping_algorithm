let TOTAL = 100
let offset = 21
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let interval
// ctx.translate(canvas.height, 0)
let random_points = []
let current = 0
let next = current+1
let searching = next+1
let hull = []
for (let i = 0; i < TOTAL; i++) {
  let x = Math.random() * (canvas.width - offset*2) + offset
  let y = Math.random() * (canvas.height - offset*2) + offset
  random_points.push(vector(x, y))
}
let points = random_points.sort((a, b) => a.x - b.x)
hull.push(points[0])
console.log(points)

function draw() {
  //clear canvas 
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //Drawing Points
  points.forEach((point, i)=>{
    let color = 'white'
    let r = 2
    if(i==current){
      color = 'green'
      r = 5
    }
    if(i==next){
      color = 'blue'
      r = 4
    }
    if(i==searching){
      color = 'red'
      r = 3
    }
    //drawing line from current to next
    ctx.beginPath()
    ctx.strokeStyle = 'blue'
    ctx.moveTo(points[current].x, points[current].y)
    ctx.lineTo(points[next].x, points[next].y)
    ctx.stroke()
    //drawing line from current to searching
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(points[current].x, points[current].y)
    ctx.lineTo(points[searching].x, points[searching].y)
    ctx.stroke()
    //drawing all points
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(point.x, point.y, r, 0, 2 * Math.PI)
    ctx.fill()
  })
  let a = points[next].subtract(points[current])
  let b = points[searching].subtract(points[current])
  if(a.cross(b).z<0){
    next = searching
  }
  draw_hull()
  
  //increment Searching
  searching++
  if(searching == current){
    searching++
  }
  if(searching == TOTAL){
    searching = 0
    if(next==0){
      clearInterval(interval)
      console.log('wrapped')
    }
    current = next 
    hull.push(points[next])
    next = Math.floor(Math.random()*(TOTAL-1))
    while(next == current){
      next = Math.floor(Math.random() * (TOTAL - 1))      
    }
  }
}
function draw_hull(){
  //drawing all points of hull
  ctx.beginPath()
  ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'
  ctx.moveTo(hull[0].x, hull[0].y)
  hull.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })
  ctx.fill()
}
interval = setInterval(()=>{draw()}, 16)