// Questions
const level1Questions = [
    { question: "What is the area of a rectangular stone block with length 6 and width 4?", answer: "24" },
    { question: "If a pyramid base has a side length of 10, what is the perimeter of the base?", answer: "40" },
    { question: "A farmer has a field that is 8 cubits long and 3 cubits wide. What is the area of the field?", answer: "24" },
    { question: "An obelisk casts a shadow of 12 cubits. If the height of the obelisk is 3 times the shadow, what is its height?", answer: "36" },
    { question: "A worker needs 5 baskets of stones each day for 6 days. How many baskets are needed in total?", answer: "30" },
    { question: "An Egyptian craftsman has a piece of wood that is 15 cubits long. If he cuts it into pieces of 3 cubits each, how many pieces does he have?", answer: "5" },
    { question: "A rectangular temple floor is 7 cubits long and 6 cubits wide. What is the perimeter of the floor?", answer: "26" },
    { question: "A boat carries 4 jars of grain, each holding 8 measures. How much grain is carried in total?", answer: "32" },
    { question: "If a worker builds 2 blocks each hour, how many blocks will he build in a 10-hour day?", answer: "20" },
    { question: "The length of a rope is 9 cubits, and it’s cut into 3 equal parts. How long is each part?", answer: "3" }
];

const level2Questions = [
    { question: "What is the perimeter of a square Greek temple base with side length 10?", answer: "40" },
    { question: "A Greek amphora holds 24 liters of wine. If it is filled into bottles of 3 liters each, how many bottles are needed?", answer: "8" },
    { question: "The Parthenon has 8 columns on each side and 17 columns along its length. How many columns in total?", answer: "46" },
    { question: "A chariot travels 12 kilometers in 1 hour. How far does it travel in 3 hours?", answer: "36" },
    { question: "A circular arena has a radius of 7. What is its area? (Use π = 3)", answer: "147" },
    { question: "A farmer divides his field into 4 equal parts. If the field's area is 400 square meters, what is the area of each part?", answer: "100" },
    { question: "A Greek mathematician calculates 3 sides of a triangle as 3, 4, and 5. What is its perimeter?", answer: "12" },
    { question: "The Greek city has a population of 120,000. If 20% are warriors, how many warriors are there?", answer: "24000" },
    { question: "A statue costs 500 drachmas. How much do 6 statues cost?", answer: "3000" },
    { question: "The angle of a right triangle measures 90°. What is the sum of the other two angles?", answer: "90" }
];

const level3Questions = [
    { question: "What is the Roman numeral for 50?", answer: "L" },
    { question: "A Roman aqueduct carries 200 liters of water per minute. How much water flows in 10 minutes?", answer: "2000" },
    { question: "If a colosseum has 80 arches, and each supports 25 tons, what is the total weight supported?", answer: "2000" },
    { question: "Convert the Roman numeral 'XIV' to a decimal number.", answer: "14" },
    { question: "A Roman legion has 4800 soldiers. If divided into 12 groups, how many soldiers are in each group?", answer: "400" },
    { question: "A farmer divides his land of 900 square meters into 15 equal parts. What is the area of each part?", answer: "60" },
    { question: "A chariot travels 15 kilometers in 3 hours. What is its speed in kilometers per hour?", answer: "5" },
    { question: "Convert the decimal number 99 to a Roman numeral.", answer: "XCIX" },
    { question: "A gladiator needs 3 liters of water daily. How much water is required for 10 days?", answer: "30" },
    { question: "A Roman road is 120 kilometers long. If a messenger travels 40 kilometers daily, how many days will it take to travel the entire road?", answer: "3" }
];

const level4Questions = [
    { question: "A lord divides his estate of 800 acres among 4 heirs. How many acres does each heir receive?", answer: "200" },
    { question: "A farmer has 50 bushels of grain and sells 15 bushels. How many bushels are left?", answer: "35" },
    { question: "If a knight travels 20 miles per day, how far will he travel in 8 days?", answer: "160" },
    { question: "A castle has 6 towers, and each tower requires 120 stones. How many stones are needed in total?", answer: "720" },
    { question: "A merchant buys 100 bolts of cloth for 300 gold coins. What is the price per bolt?", answer: "3" },
    { question: "A village produces 500 loaves of bread per week. How many loaves are produced in 10 weeks?", answer: "5000" },
    { question: "A telescope has 3 lenses, each magnifying by 10x. What is the total magnification?", answer: "30" },
    { question: "A star chart shows 12 constellations. If 4 constellations are visible at night, how many are hidden?", answer: "8" },
    { question: "A blacksmith makes 5 swords per day. How many swords are made in a week?", answer: "35" },
    { question: "A tax collector takes 10% of a villager's 200 gold coins. How much is taken?", answer: "20" }
];

const level5Questions = [
    { question: "A painting is 120 cm tall and 80 cm wide. What is its area in square centimeters?", answer: "9600" },
    { question: "A map uses a scale of 1:50,000. If a route is 10 cm on the map, how many kilometers does it represent?", answer: "5" },
    { question: "A ship travels 80 miles in 4 hours. What is its average speed in miles per hour?", answer: "20" },
    { question: "A lens magnifies objects by a factor of 5. If the object is 4 mm tall, how tall does it appear?", answer: "20" },
    { question: "A triangular window has a base of 6 meters and a height of 4 meters. What is its area in square meters?", answer: "12" },
    { question: "An explorer divides a treasure of 840 gold coins equally among 7 crew members. How many coins does each member receive?", answer: "120" },
    { question: "A printing press produces 240 pages in 6 hours. How many pages does it produce per hour?", answer: "40" },
    { question: "A gear rotates 90 times in 3 minutes. What is its rotational speed in rotations per second?", answer: "0.5" },
    { question: "An artist mixes 3 parts blue paint with 2 parts yellow paint. If they use 15 liters of paint, how many liters are blue?", answer: "9" },
    { question: "A cannonball travels 150 meters in 5 seconds. What is its average speed in meters per second?", answer: "30" }
];

const level6Questions = [
    { question: "A steam engine requires 12 gallons of water to produce 600 kilowatts of power. How many gallons are needed to produce 1,800 kilowatts?", answer: "36" },
    { question: "A factory machine produces 720 items in 24 hours. If the machine operates for 16 hours, how many items will it produce?", answer: "480" },
    { question: "A gear rotates 360 times in an hour. How many degrees does it rotate per second?", answer: "6" },
    { question: "A train carries 240 passengers over a 300-mile journey in 5 hours. What is the average speed in miles per hour?", answer: "60" },
    { question: "A coal mine produces 2,500 tons of coal in 50 days. How many tons does it produce in 120 days?", answer: "6000" },
    { question: "A factory line can produce 450 parts in 15 hours. If the factory adds another machine doubling the output, how many parts will it produce in 20 hours?", answer: "1200" },
    { question: "A steamship consumes 400 gallons of fuel to travel 200 miles. What is its fuel consumption in gallons per mile?", answer: "2" },
    { question: "A bridge is constructed using 12,000 steel beams, each weighing 500 kilograms. What is the total weight of the steel used in tons? (1 ton = 1,000 kilograms)", answer: "6000" },
    { question: "A train takes 3 hours to cover a distance of 210 miles. If the train increases its speed by 30%, how many miles will it travel in 3 hours?", answer: "273" },
    { question: "A factory increases its production by 25% each year. If it currently produces 800 units, how many units will it produce in 2 years?", answer: "1250" }
];

const level7Questions = [
    { question: "A rocket burns 1,200 kg of fuel per second. How much fuel is burned in 3 minutes?", answer: "216000" },
    { question: "A satellite completes one orbit of 40,000 km in 2 hours. What is its speed in km/h?", answer: "20000" },
    { question: "If a spaceship accelerates at 10 m/s² for 60 seconds, what is its final speed in m/s?", answer: "600" },
    { question: "A planet is 120 million km from the sun. Light travels at 300,000 km/s. How long does light take to reach the planet in seconds?", answer: "400" },
    { question: "A rocket carries 5 astronauts and each uses 3 liters of oxygen per hour. How many liters are needed for a 24-hour journey?", answer: "360" },
    { question: "An orbit requires 12,000 liters of fuel. If the rocket has a capacity of 3,000 liters, how many refuels are needed?", answer: "4" },
    { question: "A satellite transmits data at 50 megabits per second. How much data is transmitted in 1 minute?", answer: "3000" },
    { question: "A spaceship travels 700,000 km in 8 hours. What is its average speed in km/h?", answer: "875000" },
    { question: "If Earth's gravity is 9.8 m/s², what is the weight of a 1,000 kg object on Earth in Newtons?", answer: "9800" },
    { question: "A solar panel generates 200 watts per hour. How many watts does it produce in 24 hours?", answer: "4800" }
];

const level8Questions = [
    { question: "A dataset has 10,000 rows and 50 columns. How many data points does it contain?", answer: "500000" },
    { question: "An AI model trains for 3 hours and improves its loss by 0.5% every 10 minutes. By what percentage does it improve in total?", answer: "9" },
    { question: "A deep learning model has 10 layers, and each layer has twice as many parameters as the previous one, starting with 128 in the first layer. How many parameters are in the last layer?", answer: "65536" },
    { question: "A computer processes 10 billion instructions per second. How many instructions does it process in a day?", answer: "864000000000000" },
    { question: "A convolutional neural network processes an input image of size 256x256 pixels. After a 2x2 pooling layer, what is the size of the output image?", answer: "128x128" },
    { question: "A server's CPU usage spikes to 80% for 4 hours and then runs at 20% for 6 hours. What is the average CPU usage over the 10-hour period?", answer: "44" },
    { question: "A distributed database processes 2 terabytes of data per hour across 5 servers. How much data does each server process in 10 hours?", answer: "4" },
    { question: "An algorithm has a time complexity of O(n^2). If n = 1000, how many operations will it perform?", answer: "1000000" },
    { question: "A network transmits data at 1 gigabit per second. How much data is transmitted in 30 minutes, in gigabytes?", answer: "225" },
    { question: "A hash table has a capacity of 1024 slots and uses 75% of its slots. How many slots are still available?", answer: "256" }
];