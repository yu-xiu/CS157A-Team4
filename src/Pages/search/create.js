import React from 'react';
import logo from '../../images/curious_cat.png';
import api from '../../backend/backend';
import Select from 'react-select';

const options = [
    { value: 'Brand New', label: 'Brand New' },
    { value: 'Lightly Used', label: 'Lightly Used' },
    { value: 'Wrote In', label: 'Wrote In' },
    { value: 'Worn', label: 'Worn' },
    { value: 'Poor', label: 'Poor' },

  ];
class Create extends React.Component {	
    constructor(props) {
        super(props);
      
      this.state = {
        message:[],
        image:logo,
        condition:'',
        error:null,
        author: '',
        bookname: '',
        condition: '',
        course: '',
        description:'',
        price: 0,
        poster: 23,
      };
      this.storageUpdated = this.storageUpdated.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    storageUpdated() {
      if (window.localStorage.getItem("token") !== this.state.token) {
        this.setState({
          token: window.localStorage.getItem("token"),
          user: JSON.parse(window.localStorage.getItem("currentUser"))
        });
      }
    }

    newSelect = (condition) => {
        this.setState({ condition: condition.value });
        console.log(`Option selected:`, condition);
    }
    handleChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        if(this.state.condition == ''){
            let returns = "Missing a field";
            this.setState({error:returns});
            return;
        }
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = +yyyy+'-'+mm+'-'+dd;
        console.log(today);
        let newPost = {
            author: this.state.author,
            bookname: this.state.bookname,
            condition: this.state.condition,
            course: this.state.course,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            poster: 23,
            date: today,
        };

        fetch(api + "/posts/create", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(newPost)
          }).then(results => {
            return results.json();
          }).then(data => {
            if (data["error"]) {
              alert(data["message"])
            } else {
                window.alert("Successfully made a sales post.");
            }
          });
    } 
    
    handlePhoto(ev){
        this.setState({error:"Uploading Image...."});
        ev.preventDefault();
        let fileSelect = ev.currentTarget.files[0];
        console.log(fileSelect);
        const formData = new FormData();
        formData.append('image', fileSelect);
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers:{
                'Authorization': 'Client-ID 2175ee4b0324172',
                },
            body: formData
          }).then(results => {
            return results.json();
          }).then(data => {
                console.log(data.data.link);
                this.setState({image:data.data.link,error:''})

            }
          )
        }
    

    

	render() {
    	return (
        <div className="font-sans-pro md:pl-10 md:pr-10 md:pt-12">
          <div className="w-full h-full md:mt-8">
          <div className="leading-loose flex justify-center">
  <form onSubmit={this.handleSubmit} className="md:w-1/2 w-3/4 m-4 p-10 bg-white rounded shadow-xl font-bold">
    <p className="text-gray-800 text-3xl text-center font-bold">Create a Post</p>
    <div className="md:flex md:justify-between ">
    <div className="w-full">
      <label className=" block text-medium text-gray-00" for="bookname">Book Title</label>
      <input className=" w-full block mr-auto px-5 py-1 h-12 text-gray-700 bg-gray-200 rounded"  onChange= {(e) =>this.handleChange(e)} id="bookname" name="bookname" type="text" required placeholder="Ex: Defense Against the Dark Arts" aria-label="Book"/>
    </div>
    <div className="md:w-1/3 md:px-2 w-full">
    <label className="block text-medium text-gray-00" for="author">Author</label>
    <input className="block w-full md:w-auto ml-auto px-5 py-1 h-12 text-gray-700 bg-gray-200 rounded" onChange= {(e) =>this.handleChange(e)} id="author" name="author" type="text" required placeholder="Ex: J.K. Rowling" aria-label="Author"/>
    </div>
    </div>
    <div className="rounded  justify-between w-full ">
  <div className="md:flex md:justify-between w-full md:w-auto">
    <div className="md:w-1/3 w-full flex-none">
    <label className="block text-medium text-gray-00" for="condition">Condition</label>
      <input onChange= {(e) =>this.handleChange(e)} name="condition" id="condition" className="hidden block bg-gray-200 h-12 w-full md:w-auto rounded px-5 py-1"></input>
      <Select required onChange={this.newSelect} name="condition" id="condition" className="col-md-8 col-offset-4 flex-none"options = {options} />
    </div>
    <div className="md:w-1/3 md:px-2 w-full">
    <label for="course" className=" block text-gray-00 font-bold font-medium">Course</label>
      <input onChange= {(e) =>this.handleChange(e)} name="course" id="course" className="block bg-gray-200 h-12 w-full md:w-auto rounded px-5 py-1" ></input>
    </div>
    <div className="md:w-1/3 md:px-2 w-full">
    <label for="price" className="block text-gray-00 font-bold font-medium">Price</label>
      <input onChange= {(e) =>this.handleChange(e)} name="price" id="price"className="bg-gray-200 h-12 w-full md:w-auto rounded px-5 py-1" type="number" min="1" step="any"></input>
    </div>
  </div>
</div>
    <div className="w-full">
        <label for="description" className="block text-gray-00 font-bold font-medium">
            Description
        </label>
        <textarea onChange= {(e) =>this.handleChange(e)} name="description" id="description" className="w-full px-5 py-1 align-text-top bg-gray-200 h-48 rounded text-justify"></textarea>

    </div>
    <div className="mt-4 md:w-full md:flex md:justify-end">
        <div className="w-full">
        <label for="image" className="block text-gray-00 font-bold font-medium">Optional: Upload a Photo of your Book</label>
        <input id="image" type="file" name="image" onChange= {(e) =>this.handlePhoto(e)} />
        </div>
        <p className="w-full px-4 mt-4 text-center items-center block text-red-600 font-sans-pro text-2xl font-bold text-left justify-center">
            {this.state.error}
          </p>
      <button className="px-4 py-1 mt-4 md:mt-0 md:w-auto w-full text-white font-bold text-2xl tracking-wider md:w-1/4 hover:bg-teal-600 bg-blue-new rounded" type="submit">Post</button>
    </div>
  </form>
</div>
          </div>
        </div>
		)	
	}
}

export default Create;
