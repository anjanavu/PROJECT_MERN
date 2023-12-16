import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosintercepter';
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import '../Css/Dashboard.css';
import { useParams } from 'react-router-dom';

const columnStyle = { border: '1px solid #dddddd', textAlign: 'center' };
const headerColumnStyle = { ...columnStyle, fontWeight: 'bold' };

const Detail = () => {
  const { _id } = useParams();
  const [batchDetails, setBatchDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [batchName, setBatchName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Show loading spinner

        const batchResponse = await axiosInstance.get(`http://localhost:3033/exam/batch/${_id}/name`, {
          headers: {
            Accept: 'application/json',
          },
        });

        const batchName = batchResponse.data.name;
        setBatchName(batchName);

        const response = await axiosInstance.get(`http://localhost:3033/exam/batch/${_id}`, {
          headers: {
            Accept: 'application/json',
          },
        });

        setBatchDetails(response.data);
      } catch (error) {
        console.error('Error occurred while fetching batch details:', error);
      } finally {
        setLoading(false); // Hide loading spinner regardless of success or failure
      }
    };

    fetchData();
  }, [_id]);

  const sendEmails = async () => {
    try {
      setLoading(true); // Show loading spinner

      const response = await axiosInstance.post('http://localhost:3033/exam/send-emails', {
        batchDetails,
      });

      setLoading(false); // Hide loading spinner

      alert('Email sent successfully');
      window.location.reload(false);
      console.log('Emails sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending emails:', error);
      setLoading(false); // Hide loading spinner
    }
  };

  async function downloadCSV() {
    const response = await axiosInstance.get(`http://localhost:3033/exam/batch/${_id}`, {
      responseType: 'blob',
      headers: {
        Accept: 'text/csv',
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${_id}.csv`);

    link.click();
  }

  return (
    <main className='main-container'>
      <div>
        <Typography sx={{ margin: '3%' }} variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
          {batchName}
        </Typography>
        <div className="fab-buttons">
          <Fab
            style={{ float: 'right', margin: '0 5% 16px 0', backgroundColor: '#000000', color: 'white', textTransform: 'none' }}
            variant="extended"
            size="small"
            aria-label="add"
            onClick={sendEmails}
          >
            {loading ? <CircularProgress size={20} style={{ marginRight: '8px' }} /> : <SendIcon style={{ marginLeft: '8px' }} />} Send Result
          </Fab>
          <Fab
            style={{ float: 'right', margin: '0 5% 16px 0', backgroundColor: '#000000', color: 'white', textTransform: 'none' }}
            variant="extended"
            size="small"
            aria-label="add"
            onClick={downloadCSV}
          >
            <DownloadIcon /> Download csv
          </Fab>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper} sx={{ width: '90%', margin: '5%' }}>
            <Table className="table-style" sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead className="table-head" sx={{ backgroundColor: '#A9A9A9', color: 'white' }}>
                <TableRow>
                  <TableCell sx={headerColumnStyle}>Student Name</TableCell>
                  <TableCell sx={headerColumnStyle}>Email</TableCell>
                  <TableCell sx={headerColumnStyle}>Register Status</TableCell>
                  <TableCell sx={headerColumnStyle}>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {batchDetails.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell sx={columnStyle}>{student.studentId.name}</TableCell>
                    <TableCell sx={columnStyle}>{student.studentId.email}</TableCell>
                    <TableCell sx={columnStyle} style={{ color: student.studentId.status ? 'black' : 'red' }}>
                      {student.studentId.status ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell sx={columnStyle}>{student.result || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </main>
  );
};

export default Detail;
