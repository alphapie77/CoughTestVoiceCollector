import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Pagination } from 'react-bootstrap';
import { recordingsAPI } from '../services/api';

const ViewRecordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    recording_method: '',
    file_format: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecordings();
  }, [currentPage, filters]);

  const fetchRecordings = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        ),
      };
      
      const response = await recordingsAPI.list(params);
      setRecordings(response.data.results || response.data);
      
      if (response.data.count) {
        setTotalPages(Math.ceil(response.data.count / 20));
      }
    } catch (error) {
      console.error('Error fetching recordings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      recording_method: '',
      file_format: '',
    });
    setCurrentPage(1);
  };

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body className="p-4">
              <h2>📊 All Recordings</h2>
              <p className="text-muted mb-0">
                Browse all cough recordings contributed to the research database
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body>
              <h5 className="mb-3">🔍 Filters</h5>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Search by username or filename"
                      className="form-control-custom"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Recording Method</Form.Label>
                    <Form.Select
                      name="recording_method"
                      value={filters.recording_method}
                      onChange={handleFilterChange}
                      className="form-control-custom"
                    >
                      <option value="">All Methods</option>
                      <option value="browser">Browser Recording</option>
                      <option value="upload">File Upload</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>File Format</Form.Label>
                    <Form.Select
                      name="file_format"
                      value={filters.file_format}
                      onChange={handleFilterChange}
                      className="form-control-custom"
                    >
                      <option value="">All Formats</option>
                      <option value="webm">WebM</option>
                      <option value="wav">WAV</option>
                      <option value="mp3">MP3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button
                    variant="outline-secondary"
                    onClick={clearFilters}
                    className="w-100"
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recordings Table */}
      <Row>
        <Col>
          <Card className="table-custom">
            <Table responsive className="mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>File Name</th>
                  <th>Duration</th>
                  <th>Size</th>
                  <th>Format</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Play</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center p-4">
                      <div className="spinner-border text-primary" />
                    </td>
                  </tr>
                ) : recordings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center p-4">
                      <h5>No recordings found</h5>
                      <p className="text-muted mb-0">
                        Try adjusting your filters or check back later
                      </p>
                    </td>
                  </tr>
                ) : (
                  recordings.map((recording) => (
                    <tr key={recording.recording_id}>
                      <td>
                        <strong>{recording.user_display_name}</strong>
                      </td>
                      <td>{recording.file_name}</td>
                      <td>
                        {recording.duration 
                          ? `${recording.duration.toFixed(1)}s` 
                          : 'N/A'
                        }
                      </td>
                      <td>{recording.file_size_mb} MB</td>
                      <td>
                        <span className="badge bg-secondary">
                          {recording.file_format.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          recording.recording_method === 'browser' 
                            ? 'bg-success' 
                            : 'bg-info'
                        }`}>
                          {recording.recording_method === 'browser' 
                            ? '🎙️ Browser' 
                            : '📁 Upload'
                          }
                        </span>
                      </td>
                      <td>
                        {new Date(recording.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <audio controls style={{width: '200px'}}>
                          <source src={recording.audio_file_url} />
                          Your browser does not support audio playback.
                        </audio>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev 
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = Math.max(1, currentPage - 2) + index;
                if (pageNumber <= totalPages) {
                  return (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  );
                }
                return null;
              })}
              
              <Pagination.Next 
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ViewRecordings;