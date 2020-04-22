var forEach = (arr, func) => Array.prototype.forEach.call(arr, func)

var TotalElement = null

var previewIMG = null

var _north = false
var _south = false

var getPurchaseValue = element => {
	let final = null
	forEach(element.classList, name => {
			if(final==null && name.startsWith("purchasable-")) final = parseInt(name.replace("purchasable-",""))
		})
	return final
}

var _num = 0

var Counter = {
	get Value() {
		return _num
	},
	
	set Value(val) {
		_num = val
		TotalElement.innerHTML = val * numUse.Value
	}
}

var _use = null

var numUse = {
	get Value() {
		return parseInt(_use.innerHTML)
	},
	
	set Value(val) {
		_use.innerHTML = val
		TotalElement.innerHTML = Counter.Value * numUse.Value
	}
}

function toggleButton(btn, val){
	if(btn.classList.contains("off"))
	{
		btn.classList.remove("off")
		btn.classList.add("on")
		Counter.Value += val
		return
	}
	btn.classList.remove("on")
	btn.classList.add("off")
	Counter.Value -= val
}

function setImage(){
	previewIMG.src = `img/${!_north && !_south ? 'Flag.png' : _north && _south ? 'Full.jpg' : _north ? 'North.png' : 'South.png'}`
}

window.onload = _ =>
{
	TotalElement = document.getElementById("Total")
	_use = document.getElementById("use")
	previewIMG = document.getElementById("preview")
	let errorEl = document.getElementById("Error")
	errorEl.style.display = "none"
	document.getElementById("Done").onclick = () => 
	{
		errorEl.innerHTML = parseInt(TotalElement.innerHTML) > 0 ? "Ajánlatunk sajnos nem érvényes :(" : "Nem választott semmit :P"
		errorEl.style.display = "block"
	}
	forEach(document.getElementsByClassName("clickable"), element => {
			let clickText = element.getElementsByClassName("clickableText")[0]
			clickText.onclick = () => {
				forEach(element.children, child => {
					if(!child.classList.contains("clickableText") && !child.classList.contains("clickWrapper"))child.style.display = child.style.display == "none" ? "block" : "none"
				})
				if(clickText.classList.contains("north")) _north = !_north
				if(clickText.classList.contains("south")) _south = !_south
				setImage()
			}
			forEach(element.children, child => {
					if(!child.classList.contains("clickableText") && !child.classList.contains("clickWrapper"))child.style.display = "none"
				})
		})
	forEach(document.getElementsByClassName("clickabletext"), element => {
			let Value = getPurchaseValue(element)
			if(Value!=null)
			{
				let wrapDiv = document.createElement("div")
				wrapDiv.classList.add("clickWrapper")
				let Clone = element.cloneNode(true)
				Clone.onclick = element.onclick
				wrapDiv.appendChild(Clone)
				let btn = document.createElement("button")
				btn.innerHTML = `${Value} FT`
				btn.classList.add("off")
				let Space = document.createElement("a")
				Space.innerHTML = " "
				wrapDiv.appendChild(Space)
				btn.onclick = () => toggleButton(btn, Value)
				wrapDiv.appendChild(btn)
				element.replaceWith(wrapDiv)
			}
		})
	document.getElementById("minus").onclick = () => { if(numUse.Value>1) numUse.Value-=1 }
	document.getElementById("plus").onclick = () => numUse.Value+=1
	setImage()
}
