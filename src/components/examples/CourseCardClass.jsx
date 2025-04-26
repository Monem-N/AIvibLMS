import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCourseDetails } from '../../actions/courseActions';
import $ from 'jquery';

/**
 * CourseCard component (Class-based)
 * This is an example of a class-based component that needs to be converted to a functional component.
 */
class CourseCardClass extends Component {
  static propTypes = {
    courseId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    fetchCourseDetails: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loading: true,
      details: null
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.fetchDetails();
    // jQuery DOM manipulation - should be replaced with CSS transitions
    $(this.cardRef.current).fadeIn(500);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.courseId !== this.props.courseId) {
      this.fetchDetails();
    }
  }

  componentWillUnmount() {
    // Clean up any subscriptions or timers
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  fetchDetails = () => {
    this.setState({ loading: true });
    this.props.fetchCourseDetails(this.props.courseId)
      .then(details => {
        this.setState({
          details,
          loading: false
        });
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
        this.setState({ loading: false });
      });
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  handleEnroll = () => {
    // jQuery DOM manipulation - should be replaced with React state
    $(this.cardRef.current).addClass('enrolled');
    
    // Show a confirmation message
    this.setState({ enrolled: true });
    
    // Set a timer to hide the confirmation
    this.timer = setTimeout(() => {
      this.setState({ enrolled: false });
    }, 3000);
  }

  render() {
    const { title, description } = this.props;
    const { expanded, loading, details, enrolled } = this.state;

    return (
      <div 
        ref={this.cardRef}
        className={`course-card ${expanded ? 'expanded' : 'collapsed'}`}
      >
        <div className="card-header" onClick={this.toggleExpanded}>
          <h3>{title}</h3>
          <span className="expand-icon">{expanded ? '▼' : '►'}</span>
        </div>
        
        <p className="description">{description}</p>
        
        {expanded && (
          <div className="card-details">
            {loading ? (
              <div className="loading">Loading details...</div>
            ) : details && (
              <>
                <div className="details-row">
                  <span className="label">Instructor:</span>
                  <span className="value">{details.instructor}</span>
                </div>
                <div className="details-row">
                  <span className="label">Duration:</span>
                  <span className="value">{details.duration}</span>
                </div>
                <div className="details-row">
                  <span className="label">Level:</span>
                  <span className="value">{details.level}</span>
                </div>
                <div className="details-row">
                  <span className="label">Rating:</span>
                  <span className="value">{details.rating} / 5</span>
                </div>
                
                <button 
                  className="enroll-button"
                  onClick={this.handleEnroll}
                >
                  Enroll Now
                </button>
                
                {enrolled && (
                  <div className="enrollment-confirmation">
                    You have successfully enrolled in this course!
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  details: state.courses.details[ownProps.courseId]
});

const mapDispatchToProps = {
  fetchCourseDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCardClass);
