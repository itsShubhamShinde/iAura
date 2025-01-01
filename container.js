console.log("Shipping Company Optimization");

function count(ship,cointainer){
    let j=0;
    for(i=0;i<ship.length;i++){
        while(ship[i]>0){
            if(j >= cointainer.length){
                return -1
            }
            if(cointainer[j] >= ship[i]){
                cointainer[j] -= ship[i]
                ship[i]=0;
            }
            else{
                ship[i] -= cointainer[j];
                cointainer[j]=0
                j++;
            }
            if(cointainer[j] === 0){
                j++
            }
        }   
    }
   return j ;
}
// shift=[10,10,10,10,10,10]
// shift=[10,10,10,20]
// shift=[10,10,10]
shift=[10,20,30]
container=[15,15,20,10]
result=count(shift,container)
console.log("Thus, the minimum number of containers needed is",result);
