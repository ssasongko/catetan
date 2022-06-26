import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component{
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }

    constructor(props){
        super(props);
        
        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({activeTab: tab});
    }

    render(){
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return(
            <div className='w-100 mt-3 tabs'>
                <ol className='tab-list d-flex justify-content-between'>
                    {children.map((child) => {
                        const {label} = child.props;
                        
                        return(
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                        )
                    })}
                </ol>
                <div className='tab-content p-2'>
                    {children.map((child) => {
                        if(child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </div>
        )
    }
}

export default Tabs;

//     <ol className='tab-list'>
            //         {children.map((child) => {
            //             const {label} = child.props;
                        
            //             return(
            //                 <Tab
            //                     activeTab={activeTab}
            //                     key={label}
            //                     label={label}
            //                     onClick={onClickTabItem}
            //                 />
            //             )
            //         })}
            //     </ol>
            //     <div className='tab-content'>
            //         {children.map((child) => {
            //             if(child.props.label !== activeTab) return undefined;
            //             return child.props.children;
            //         })}
            //     </div>