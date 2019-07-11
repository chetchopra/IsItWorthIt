# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(name: "Bob", email: "bob@geemail.com", bio: "Just some dude", img_url: "https://pbs.twimg.com/profile_images/947667767074983936/-zoXfLVh_400x400.jpg")

item1 = Item.create(name: "TV", cost: 1000.00, img_url: "📺", purchase_link: "https://www.amazon.com/LG-Electronics-70UK6570PUB-70-Inch-Ultra/dp/B079TSTB5V/ref=asc_df_B079TSTB5V/?tag=hyprod-20&linkCode=df0&hvadid=309830209401&hvpos=1o3&hvnetw=g&hvrand=10625426305975263986&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1027744&hvtargid=aud-836408683912:pla-571320877358&psc=1", description: "picture box", user_id: 1)

cupcake = ComparisonItem.create(name: "cupcake", cost: 3.00, description: "yummy cupcake", img_url: "assets/cupcake.svg")
coffee = ComparisonItem.create(name: "coffee", cost: 5.00, description: "caffeinated drink", img_url: "assets/coffee.svg")
sake = ComparisonItem.create(name: "sake", cost: 1.00, description: "Japanese liquor", img_url: "assets/sake.svg")
pencil = ComparisonItem.create(name: "pencil", cost: 0.10, description: "writing stick", img_url: "assets/pencil.svg")
toilet_paper = ComparisonItem.create(name: "toilet paper", cost: 0.60, description: "butt wiper", img_url: "assets/toilet-paper.svg")

