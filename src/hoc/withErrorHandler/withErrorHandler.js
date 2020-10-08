import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler=(WrappedContent,axios)=>{
    return class extends Component{

        state={
            error:null
        }

        componentWillMount(){
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            })
            this.resInterceptors=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }
        errorconfirmedhandler=()=>{
            this.setState({error:null})
        }

        render(){
            return (
                <>
                <Modal show={this.state.error} Modalclose={this.errorconfirmedhandler}>
                    {this.state.error ?this.state.error.message : null}
                </Modal>
                <WrappedContent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler