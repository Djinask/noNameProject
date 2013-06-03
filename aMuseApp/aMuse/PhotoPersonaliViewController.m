//
//  PhotoPersonaliViewController.m
//  aMuse
//
//  Created by simone on 10/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "PhotoPersonaliViewController.h"
#import "UploadPhotoViewController.h"

@interface
PhotoPersonaliViewController (){
    UIActivityIndicatorView *spinner;
    NSURLRequest *urlrequest;
}

@end

@implementation PhotoPersonaliViewController{
    UIImage *image;
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    
    //setto spinner
    spinner = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhiteLarge];
    spinner.frame = CGRectMake(0.0, 0.0, 40.0, 40.0);
    spinner.hidesWhenStopped = YES;
    spinner.color = [UIColor colorWithWhite:0.0 alpha:1.0];
    spinner.center = self.view.center;
    [self.view addSubview:spinner];
    
//  Richiesta di caricamento
    self.photopersonaliView.delegate = self;
    NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileviews/myphotos"];
    urlrequest = [[NSURLRequest alloc] initWithURL:url];
	[NSURLConnection connectionWithRequest:urlrequest delegate:nil];
    [self.photopersonaliView loadRequest:urlrequest];
}

-(void)webViewDidStartLoad:(UIWebView *)webView{
    [spinner startAnimating];
    NSLog(@"Carico pagina");
}

-(void)webViewDidFinishLoad:(UIWebView *)webView{
    [spinner stopAnimating];
    NSLog(@"Dovrebbe smettere");
    NSURL *newURL = self.photopersonaliView.request.URL;
    NSLog([NSString stringWithFormat:@"%@", newURL ]);
    NSURL *correct = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileviews/myphotos"];
    if(![newURL isEqual:correct]){
        NSLog(@"Ulr non è corretto");
        [self tryLogin];
        [webView loadRequest:urlrequest];
    }
}

-(IBAction)reload{
    [self.photopersonaliView loadRequest:urlrequest];
    [spinner startAnimating];
}


-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
    NSLog(@"Connection error");
    UIAlertView *errore = [[UIAlertView alloc] initWithTitle:@"Errore di Connessione" message:@"Impossibile caricare la pagina. Sicuro di essere connesso?" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles: nil];
    [errore show];
    [spinner stopAnimating];
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex{
    if (buttonIndex == 0) {
        [self takePhoto];
    } else if (buttonIndex == 1){
        [self choosePhotoFromLibrary];
    }
}

- (IBAction)aggiungiFoto{
    if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
        UIActionSheet *azione = [[UIActionSheet alloc]
                                 initWithTitle:@"Carica una foto"
                                 delegate:self
                                 cancelButtonTitle:@"Annulla"
                                 destructiveButtonTitle:nil
                                 otherButtonTitles:@"Scatta foto", @"Scegli dal Rullino", nil];
        [azione showFromTabBar:self.tabBarController.tabBar];
    } else {
        [self choosePhotoFromLibrary];
    }
}

- (void)choosePhotoFromLibrary{
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc]init];
    imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    imagePicker.delegate = self;
    [self presentViewController:imagePicker animated:YES completion:nil];
}

-(void)takePhoto{
    UIImagePickerController *imagePicker = [[UIImagePickerController alloc]init];
    imagePicker.sourceType = UIImagePickerControllerSourceTypeCamera;
    imagePicker.delegate = self;
    [self presentViewController:imagePicker animated:YES completion:nil];
}


- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
        image = [info objectForKey:UIImagePickerControllerOriginalImage];
    [self dismissViewControllerAnimated:YES completion:^{
        [self performSegueWithIdentifier:@"UploadPhoto" sender:nil];
    }];
    }

-(void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender{
    if ([segue.identifier isEqualToString:@"UploadPhoto"]){
        UploadPhotoViewController *controller = (UploadPhotoViewController *) segue.destinationViewController;
        controller.photo = image;
        controller.delegate = self;
    }
}


- (void)tryLogin{
    NSString *email = [[NSUserDefaults standardUserDefaults] valueForKey:@"email"];
    NSString *password = [[NSUserDefaults standardUserDefaults] valueForKey:@"password"];
    if (email != nil && password != nil){
        NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileapi/login"];
        ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:url];
        [request setRequestMethod:@"POST"];
        [request setPostValue:email forKey:@"email"];
        [request setPostValue:password forKey:@"password"];
        [request setPostValue:@"submit" forKey:@"post"];
        [request setDelegate:self];
        [request startAsynchronous];
    }else{
        NSLog(@"Impossibile");
    }
}


-(void)requestFinished:(ASIHTTPRequest *)request{
    NSLog(@"Processo concluso");
}


-(void)trytoConnect{
    [self.photopersonaliView loadRequest:urlrequest];
}

-(void)didFinishUploadingPhoto{
    NSLog(@"Ricarico");
    [self.photopersonaliView reload];
}

@end
