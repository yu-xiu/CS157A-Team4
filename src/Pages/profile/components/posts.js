import React from 'react';
import Column from "../../../column";

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            password: [],
            status:'',
            friends: [
                {relationshipId: 0, user1: '', user2: '', firstname: '',surname: ''}
            ],
            loaded:false // do not reload page
        };
    }

    UNSAFE_componentWillMount() { // call before render
        this.show_post()
    }

    show_post() {
        console.log("test show posts!!!");
        let user = 23;

        console.log(user)
        fetch (`https://sjsubookietest.herokuapp.com/profile/getAll/${user}`).then(results => {
            return results.json()
        }).then(data=>{
            if (data["error"]) {
                alert(data["message"]);
            }
            else{
                console.log(data["data"]);
                alert(data["message"]);
            }
        })
    }

    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }

    updateState(e){
        this.setState({status:e.target.id})
    }

	render() {
    	return (
            // this.state.loaded && (
            <div className="flex w-full h-full">
                <Column/>
        <div className="w-full">Posts Data</div>
            </div>
		//)
        )
	}
}

export default Posts;
