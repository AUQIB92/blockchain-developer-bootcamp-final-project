## Avoiding Common Attacks

Below is the  list of the measures taken to avoid common attacks.

* The contracts supporting this DApp do not intentionally store a balance of Ether and have no functions to manage storage of Ether. This by itself reduces exposure to attacks.

* There is only one "payable" functions ```buy```.  The function is guarded with nonReentrant to avoid any possible Reentrancy attack. Also there are mutlipe rquire statements to ensure  that every thing is in correct order for the function  to execute  succesfully. 


* Using a specific pragma compile - Solidity 0.8.3 is used and not floating pragma.
