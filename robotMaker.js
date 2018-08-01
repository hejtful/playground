// So, I want to build a robot
const assembleRobot = (head, torso, hands, legs) => {
  if (head && torso && hands && legs) return `Robotic abomination with a ${head}, ${torso}, ${hands}, ${legs}`
  return 'The robot makes some baby moves and then collapses catastrophically.'
}

// If I was living in Wonderland, I could just do
assembleRobot(headPart, torsoPart, handsPart, legsPart)

// But the problem is, I don't have all the parts I need...
console.log(headPart, torsoPart, handsPart, legsPart) // undefined, undefined, undefined, undefined

// My robot-parts-guy told me he has the head part already
const headPart = 'huge beautiful head with an emo haircut'

// But my assembleRobot function expects all the parts at once :(
assembleRobot(headPart) // The robot makes some baby moves and then collapses catastrophically.

// Not to waste any time on waiting for all parts,
// I need a function that will make my assemble function accept one part at a time
const takeOnePartAtATime = fn =>  firstPart =>  secondPart =>  thirdPart =>  fourthPart => {
  fn(firstPart, secondPart, thirdPart, fourthPart)
}

// So if I apply my assemble function here
const addRobotHead = takeOnePartAtATime(assembleRobot)

// And then call that with my head part
console.log(addRobotHead(headPart))
// secondPart => thirdPart => fourthPart => {
//   fn(firstPart, secondPart, thirdPart, fourthPart)
// }
// I get a function that expects a second part

// And it would work all the way to the end...buuut, it's ugly af.
// The takeOnePartAtATime function looks more like a train with four vagons.

// And also, what if I also find a way to add a tail to my robot?
// My takeOnePartAtATime function can't really be dependant on the number of parts my assembleRobot function takes.

// Seems like I need to tweak my brain enhancer...
// Yup, there it is, partial application
const takeOnePartAtATimeImproved = (assembleRobot, ...alreadyAddedParts) => {
  return (...newParts) => {
    let allPartsTillNow = alreadyAddedParts.concat(newParts)
    if (allPartsTillNow.length < assembleRobot.length) {
      return takeOnePartAtATimeImproved(assembleRobot, ...allPartsTillNow)
    }
    return assembleRobot.apply(this, allPartsTillNow)
  }
}

// This cool new version of the already obsolete takeOnePartAtATime function
// takes a function and/or unspecified number of parts,
// const takeOnePartAtATimeImproved = (assembleRobot, ...alreadyAddedParts) => {

// returns a new function that will take some new parts
// return (...newParts) => {

// and then bundle old and new parts together,
// let allPartsTillNow = alreadyAddedParts.concat(newParts)

// check if any parts are missing
// if (allPartsTillNow.length < fn.length) {

// and if there are parts missing, use recursion to apply all the parts it has
// to itself, along with the original assembleRobot function, and return
// the new function that takes some more parts.
// return takeOnePartAtATimeImproved(assembleRobot, ...allPartsTillNow)

// If it has all the parts needed, just apply them to the assembleRobot function
// return assembleRobot.apply(this, allPartsTillNow)

// Now I can start building my robot
const robotWithAHead = takeOnePartAtATimeImproved(assembleRobot, headPart)

// And my robot-parts-guy called to tell me he has the torso part
const torsoPart = 'skinny, bonny torso'

// Let's apply that to the robot
const robotWithHeadAndTorso = robotWithAHead(torsoPart)

// But hey, it's late, I'm tired, I would love to leave this
// to finish on it's own as the parts come in

// If only there was a way to make my function promise me it will finish
// the robot when it gets the parts

// First, order the parts
const handsPart = 'four gigantic wooden hands'
const legsPart = 'freshly shaved footballer legs'
const getParts = () => [handsPart, legsPart]

// Then, I definitely need the promise itself
const pinkyPromise = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(getParts())
  }, 5000)
})

// Explain to the robotWithHeadAndTorso how to finish itself once it got the parts
const finishTheRobot = parts => robotWithHeadAndTorso(...parts)
const assembledRobot = pinkyPromise().then(finishTheRobot)

// This really is a cool feature for robot making. But,
// you might have heard of these programming languages:
// Haskell? Brook? Curry? No? You should check them out.
// A smart guy named Haskell Brook Curry was probably also playing around
// with robots, because this 'take some arguments now, some later' feature
// is named after him - currying.
// Let's tidy up our takeOnePartAtATimeImproved function, and make it universal
const curry = (fn, ...fixedArgs) => {
  return (...newArgs) => {
    let allArgs = fixedArgs.concat(newArgs)
    if (allArgs.length < fn.length) {
      return curry(fn, ...allArgs)
    }
    return fn.apply(this, allArgs)
  }
}

// Even though that is nice, curry function is supposed to only recieve
// a function (fn1), and return a function that accepts fn1's arguments
const curry = fn => {
  return (...args) => {
    if (allArgs.length < fn.length) {
      return curry(fn.bind(null, ...args))
    }
    return fn(...args)
  }
}

// You might be thinking:
// "Break this down for me, you silly robot maker apprentice!!".
// No worries, I will.

// Take a function
// const curry = fn => {

// That returns a function that takes any number of arguments
// return (...args) => {

// If there's not enough arguments, curry again,
// but bind the current arguments to the function
// return curry(fn.bind(null, ...args))

// If there is enough arguments, call the function with those arguments
// return fn(...args)

// Let's test this one last time
const curriedAssembleRobot = curry(assembleRobot)
console.log(curriedAssembleRobot('head')('torso')('hands')('legs'))
console.log(curriedAssembleRobot('head', 'torso')('hands')('legs'))
console.log(curriedAssembleRobot('head')('torso', 'hands', 'legs'))
console.log(curriedAssembleRobot('head', 'torso', 'hands', 'legs'))

// Works like a charm. I can add one part at a time, multiple parts at a time,
// or all parts at once. The one thing that bugs me about this is:
// What if my hands part comes before the torso part? Do I really need to wait
// for the torso part? I want to be able to apply any part as soon as it comes
// in. In other words, I don't want the argument order to limit me.
// I recall seeing the placeholder argument in some of the magic shops around
// Programmers and Magicians square. I'll make sure to check it out.
