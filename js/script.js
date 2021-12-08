


var nav=new NavLink();
var item=new Item("Fall Limited Edition Sneakers",250,50,15253);
var orderSection=new OrderArticle(item);
var cart=new Cart();
var gallery=new Gallery();


//Constructor

function Cart()
{
    this.IsCardDisplayed=false;
    this.items=[];
    this.cart=document.getElementById("cart");
    this.cartIcon=document.getElementById("cartIcon");


    addListener(this.cartIcon,"click",function(){cart.display();});
    addListener(this.cart,"blur",function(){cart.display();});
    
    this.addItem=function(item,quantity){
        var element=[item,quantity];

        

        this.items.push(element);

        

        this.cartUpdate(this.getLength()-1,true);
    }

    this.removeItem=function(id){
        
        this.items.splice(id,1);
        this.cartUpdate(id,false);
    }

    this.getLength=function(){return this.items.length};

    this.getName=function(i){
        
        return this.items[i][0].name;
    };
    this.getPrice=function(i){return this.items[i][0].price;};
    this.getPromotion=function(i){return this.items[i][0].promotion;};
    this.getId=function(i){return this.items[i][0].id;};

    this.getQuantity=function(i){return this.items[i][1];};

    this.cartUpdate=function(i,action){
        if(action)
        {
           
            addItemToListHTML(i);
        }
        else
        {
            removeItemFromListHTML(i);
        }

    }

    this.display=function(){


        if(this.IsCardDisplayed)
        {
            this.IsCardDisplayed=false;
        }
        else
        {
            this.IsCardDisplayed=true;
            
        }
        displayCart(this.IsCardDisplayed);
    };

}

function Item(name,price,promotion,id)
{
    this.name=name;
    
    this.price=price;
    this.promotion=promotion;
    this.id=id;


}

function addListener(element,eventToAdd,functionToAdd)
{
    
    if(element.length)
    {
        for(var i=0;i<element.length;i++)
        {
            element[i].addEventListener(eventToAdd,functionToAdd);
        }
    }
    else
    {
        element.addEventListener(eventToAdd,functionToAdd);
    }
    
    
}

function NavLink()
{
    this.navLink=document.querySelectorAll("li a");
    addListener(this.navLink,"mouseover",function(e){nav.switchBorder(true,e.target.parentNode);});
    addListener(this.navLink,"mouseout",function(e){nav.switchBorder(false,e.target.parentNode);});

    this.switchBorder=function(stateBorder,element){
              
        var value;
        
        if(stateBorder)
        {
            value="solid hsl(26, 100%, 55%) ";
        }
        else
        {
            value="solid white";
        
        }
        element.style.borderBottom=value;
  
    }

    
}

function Gallery()
{
    this.imageSelected=1;
    this.zoomOn=false;
    this.imageDisplayed=document.getElementById("imageDisplayed");
    this.thumbnail=document.querySelectorAll("#gallery .thumbnail");

    
    this.galleryZoom=document.getElementById("zoomZoom");

    this.imageSelectedZoom=1;
    this.imageDisplayedZoom=document.getElementById("imageDisplayedZoom");
    this.thumbnailZoom=document.querySelectorAll("#galleryZoom .thumbnail");
    this.sweepLeftIcon=document.getElementById("sweepLeft");
    this.sweepRightIcon=document.getElementById("sweepRight");
    this.closeIcon=document.getElementById("closeIcon");

    this.imageToChange=this.imageDisplayed;
    this.thumbnailToChange=this.thumbnail;
    this.imageSelectedToChange=1;
    

    
        addListener(this.closeIcon,"click",function(){gallery.displayZoom();});
        addListener(this.imageDisplayed,"click",function(){gallery.displayZoom();});
        addListener(this.thumbnail,"click",function(e){gallery.display(e.currentTarget);});
        addListener(this.thumbnailZoom,"click",function(e){gallery.display(e.currentTarget);});
        addListener(this.sweepRightIcon,"click",function(){gallery.sweepRight();});
        addListener(this.sweepLeftIcon,"click",function(){gallery.sweepLeft();}); 
    this.display=function(element){
        
        imageDisplay(element,this.imageToChange,this.thumbnailToChange,this.imageSelectedToChange);
    };

    this.displayZoom=function(){

        if(!this.zoomOn)
        {
            this.zoomOn=true;
            this.galleryZoom.style.display="flex";
            this.imageSelected=this.imageSelectedToChange;           
            this.imageToChange=this.imageDisplayedZoom;
            this.thumbnailToChange=this.thumbnailZoom;

        }
        else
        {
            this.imageToChange=this.imageDisplayed;
            this.zoomOn=false;
            this.galleryZoom.style.display="none";

            this.removeSelected();
            this.imageSelectedToChange=this.imageSelected;
            
            
            this.thumbnailToChange=this.thumbnail;

        }

        this.display(this.thumbnailToChange[this.imageSelectedToChange-1]);     
    }

    this.sweepRight=function(){

        if(this.imageSelectedToChange<4)
        {

            this.display(this.thumbnailToChange[this.imageSelectedToChange]);
        }
        else
        {
            this.display(this.thumbnailToChange[0]);
        }
       
    }

    this.sweepLeft=function(){
        if(this.imageSelectedToChange>1)
        {

            this.display(this.thumbnailToChange[this.imageSelectedToChange-2]);
        }
        else
        {
            this.display(this.thumbnailToChange[3]);
        }

    }

    this.getImageSelected=function(){return this.imageSelectedToChange;};
    this.setImageSelected=function(newImage){this.imageSelectedToChange=newImage;};
    this.setZoomOn=function(action){
        this.zoomOn=action;
        this.displayZoom();
    }
    this.removeSelected=function(){removeImageSelected(this.thumbnailToChange,this.imageSelectedToChange);};
    this.addSelected=function(){addImageSelected(this.thumbnailToChange,this.imageSelectedToChange);};

    this.addSelected();

}

function OrderArticle(item)
{
    this.articleNumber=0;
    this.item=item;
    
    this.divQuantity=document.getElementById("articleQuantity");
    this.addButton=document.getElementById("add");
    this.reduceButton=document.getElementById("reduce");
    this.addToCartButton=document.getElementById("addToCart");
  
    addListener(this.addToCartButton,"click",function(){orderSection.addToCart();})
    addListener(this.addButton,"click",function(){orderSection.changeQuantity(true);});
    addListener(this.reduceButton,"click",function(){orderSection.changeQuantity(false);});
    
    this.changeQuantity=function(action){

        if(action)
        {
            this.articleNumber++;
        }
        else if(this.articleNumber>0)
        {

            this.articleNumber--;

        }

        this.divQuantity.innerHTML=this.articleNumber;
    };

    this.addToCart=function(){
        
        if(this.articleNumber)
        {
        cart.addItem(this.item,this.articleNumber);
        this.articleNumber=0;
        
        this.divQuantity.innerHTML=0;
        }
    };
}





//gallery display




function imageDisplay(element,imageDisplayed,thumbnail,imageSelected)
{   
    var i=0;  
    var nextSibling=element.nextElementSibling;

    while(nextSibling)
    {
        nextSibling=nextSibling.nextElementSibling;
        console.log("oye");
        i++;
    }

    gallery.removeSelected();
    
    imageSelected=4-i;
    gallery.setImageSelected(imageSelected);

    gallery.addSelected();
   
 
    imageDisplayed.className="image"+imageSelected;

}

function addImageSelected(thumbnail,imageSelected)
{
    thumbnail[imageSelected-1].style.border="solid hsl(26, 100%, 55%)";
    thumbnail[imageSelected-1].firstElementChild.className="selected";
}

function removeImageSelected(thumbnail,imageSelected)
{  
    thumbnail[imageSelected-1].style.border="";
    thumbnail[imageSelected-1].firstElementChild.className="vail";
}

//Cart


function addItemToListHTML(i)
{
    var cartElement=document.getElementById("cart");
    var cartList=document.getElementById("itemList");
    var checkOut=document.getElementById("checkOut");

    var itemInformation=document.createElement("div");
    var miniBabyThumbnail=document.createElement("div");
    var itemName=document.createElement("div");
    var cartRemoveIcon=document.createElement("div");

    var nameParagraph=document.createElement("p");
    var priceItemCart=document.createElement("p");
    var finalPrice;

    itemInformation.className="itemInformation";
    miniBabyThumbnail.className="miniBabyThumbnail";
    itemName.className="itemName";

    cartRemoveIcon.className="cartRemoveIcon";
    cartRemoveIcon.addEventListener("click",function(e){removeItemFromCart(e.target);});


    nameParagraph.innerHTML=cart.getName(i);
    finalPrice=(cart.getPrice(i)*cart.getPromotion(i)*cart.getQuantity(i) )/100;

    priceItemCart.innerHTML="$"+(cart.getPrice(i)*cart.getPromotion(i))/100+".00x"+cart.getQuantity(i)+" $"+finalPrice;
    
    if(getComputedStyle(checkOut).display=="none")
    {
        
        var empty=document.getElementById("emptyCart");
        checkOut.style.display="block";
        empty.style.display="none";
      
    }

    itemInformation.appendChild(miniBabyThumbnail);
    itemInformation.appendChild(itemName);

    itemName.appendChild(nameParagraph);
    itemName.appendChild(priceItemCart);

    itemInformation.appendChild(cartRemoveIcon);
    cartList.appendChild(itemInformation);

}

function removeItemFromCart(element)
{
    var item=element.parentNode;
    var i=0;
    var positionItemToRemove=0;

    while(item.nextElementSibling)
    {
        item=item.nextElementSibling;
        i++;
    }

    positionItemToRemove=cart.getLength()-i;
    console.log(positionItemToRemove);
    cart.removeItem(positionItemToRemove-1);


    

}

function removeItemFromListHTML(i)
{
    var itemToRemove=document.querySelectorAll(".itemInformation");
    var length=itemToRemove.length;
    var listElement=itemToRemove[i].parentNode;
    
    if(length==1)
    {
        var checkOut=document.getElementById("checkOut");
        var empty=document.getElementById("emptyCart");
        checkOut.style.display="none";
        empty.style.display="block";
    }
    

    listElement.removeChild(itemToRemove[i]);

}



function displayCart(action)
{
    var cartElement=document.getElementById("cart");
    var cartIcon=document.getElementById("cartIcon");
     
    if(action)
    {
        cartElement.style.display="flex";
   
    }
    else
    {
         cartElement.style.display="none";

    }

    positionCart(cartIcon.offsetLeft,cartIcon.offsetTop,cartIcon.offsetHeight,cartElement);

}

function positionCart(iconX,iconY,iconHeight,cartElement)
{
    var header=document.querySelector("header");
    
    var size=iconX-header.offsetLeft;
    
    size=header.offsetWidth-size;

    
    cartElement.style.position="absolute";
    cartElement.style.top=iconY+iconHeight+3+"px";
    
    cartElement.style.left=(iconX-cartElement.offsetWidth)+size+"px";
    cartElement.style.zIndex="300";

    

}









